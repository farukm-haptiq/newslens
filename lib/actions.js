'use server';

import OpenAI from 'openai';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import { load } from 'cheerio';
import { HttpsProxyAgent } from 'https-proxy-agent';

import {
  extractImageURL,
  sanitizeHtml,
  fallbackParse,
  cleanUpSummary,
} from './helper';

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

// NEWSAPI
export const getNewsApiSources = async () => {
  try {
    let newsSources = await axios('https://newsapi.org/v1/sources');
    newsSources = [
      { label: 'All', value: 'all' },
      ...newsSources.data.sources
        .filter((source) => source.language == 'en')
        .map((source) => ({ label: source.name, value: source.id })),
    ];

    return newsSources;
  } catch (error) {
    console.log('FETCH NEWS SOURCES ERROR', error);
    return null;
  }
};

export const getArticles = async (queryParams) => {
  try {
    const newsUrl = `https://newsapi.org/v2/everything?${queryParams}`;
    //The everything endpoint is broader and returns news articles from across the web based on a search query. It provides a much wider array of articles from multiple sources, not just headlines or breaking news.
    const response = await axios(newsUrl);
    return response;
  } catch (error) {
    console.log('FETCH ARTICLES ERROR', error);
    return null;
  }
};

export const getSingleArticle = async (url) => {
  const options = {
    timeout: 30000,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
    },
    maxRedirects: 5,
  };

  try {
    const response = await axios.get(url, options);

    if (!response.data) {
      console.warn('No data received in the response');
      return { error: 'No data received', url };
    }

    const sanitizedHtml = sanitizeHtml(response.data);

    let article;
    try {
      const dom = new JSDOM(sanitizedHtml, { url });
      article = new Readability(dom.window.document).parse();
    } catch (jsdomError) {
      console.warn(`JSDOM or Readability error: ${jsdomError.message}`);
      console.warn('Falling back to Cheerio parsing');
      article = fallbackParse(sanitizedHtml, url);
    }

    if (!article) {
      console.warn('Failed to parse article');
      return { error: 'Failed to parse article', url };
    }

    const $ = load(article.content);
    $('script, iframe').remove();

    const textContent = $('body').text().trim();
    const imgUrl = extractImageURL(article.content);

    return {
      article: {
        title: article.title,
        byline: article.byline,
        content: article.content,
        textContent,
        excerpt: article.excerpt,
        siteName: article.siteName,
        publishedTime: article.publishedTime,
        imgUrl,
        url,
      },
    };
  } catch (error) {
    let errorMessage = 'Unexpected error';
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout';
      } else if (error.response) {
        errorMessage = `HTTP error ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Network error';
      }
    }
    console.warn(`Error fetching article from ${url}:`, errorMessage, error);
    return { error: errorMessage, url };
  }
};

export const getSingleArticleSummary = async (cleanText) => {
  const content = cleanUpSummary(cleanText);
  try {
    const response = await openai.chat.completions.create({
      // model: 'gpt-3.5-turbo',
      model: 'gpt-4o-mini',

      messages: [
        {
          role: 'system',
          content:
            'You are an AI assistant that summarizes news articles and analyzes key data from them. Your task is to provide a summary, determine sentiment, identify geographic level, extract topics, identify key mentions, assess relevance to the region, and generate actionable insights.',
        },
        {
          role: 'user',
          content: `
            Here is the article: ${content}. 
            Please provide a response in the following format json format and remove any unexpected token that will cause an error when i will try to parse the response:
            {
              "title": "The title of the article",
              "summary": "A brief summary of the article's key points.",
              "sentiment": "positive/negative/neutral",
              "geographic_level": "community/city/state/country",
              "topics_covered": ["Topic 1", "Topic 2", "Topic 3"],
              "key_mentions": [
                {
                  "entity": "Entity Name",
                  "type": "person/organization/event",
                  "mention_count": 3
                }
              ],
              "relevance_to_region": "high/medium/low",
              "actionable_insights": [
                "Insight 1",
                "Insight 2"
              ]
            }
          `,
        },
      ],
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.log('GET SINGLE NEWS SUMMARY', error);
    return null;
  }
};

// NEWSDATA.IO
export const getNewsSearchDataSources = async () => {
  try {
    let newsSources = await axios(
      `https://newsdata.io/api/1/sources?apikey=${process.env.NEWS_DATA_IO_API_KEY}`
    );

    newsSources = [
      { label: 'All', value: 'all' },
      ...newsSources.data.results
        .filter((source) => source.language.includes('english'))
        .map((source) => ({ label: source.name, value: source.id })),
    ];

    return newsSources;
  } catch (error) {
    console.log('FETCH NEWS DATA IO SOURCES ERROR', error);
    return [];
  }
};

export const getNewsSearchArticles = async ({ queryParams }) => {
  const params = new URLSearchParams(queryParams);
  const category = params.get('category');

  try {
    if (category) {
      params.delete('category');
      const newQueryParams = params.toString();
      const newsUrl = ` https://newsdata.io/api/1/news?${newQueryParams}`;
      const response = await axios(newsUrl);

      console.log({ articles: response.data.results });

      const articles = response.data.results.filter((article) =>
        article.category.includes(category)
      );
      console.log('AFTER FILTER');

      console.log({ articles });

      return {
        articles,
        nextPage: response.data.nextPage,
      };
    } else {
      const newsUrl = ` https://newsdata.io/api/1/news?${queryParams}`;
      const response = await axios(newsUrl);

      return {
        articles: response.data.results,
        nextPage: response.data.nextPage,
      };
    }
  } catch (error) {
    console.log('FETCH GET SUMMARY ARTICLE ERROR', error);
    return [];
  }
};

// PROXY
// const getProxyAgent = () => {
//   const username = 'brd-customer-hl_3f7b4877-zone-newslens';
//   const password = 'sxnij5go4vyn';
//   const host = 'brd.superproxy.io';
//   const port = 33335;
//   const session_id = (1000000 * Math.random()) | 0;

//   const proxyUrl = `http://${username}-session-${session_id}:${password}@${host}:${port}`;
//   return new HttpsProxyAgent(proxyUrl);
// };

export const getNewsSearchArticlesContent = async (urls) => {
  let articles = await Promise.allSettled(
    urls.map(async (url) => {
      const { article } = await getSingleArticle(url);
      return article;
    })
  );

  articles = articles
    .filter((article) => article.status === 'fulfilled')
    .map((article) => article.value);

  return articles;
};

export const getNewsSearchArticlesSummary = async (articles, cleanText) => {
  let content;
  if (cleanText) {
    content = articles
      .map((article, index) => {
        return `
        Article ${index + 1}: 
        ${article.slice(0, 500)}...
      `;
      })
      .join('\n');
  } else {
    content = articles
      .map((article, index) => {
        return `
        Article ${index + 1}: ${article?.title}
        ${article?.textContent?.slice(0, 500)}...
      `;
      })
      .join('\n');

    content = cleanUpSummary(content);
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `
        You are an AI assistant that summarizes news articles and analyzes key data from them.
        Your task is to provide a summary, determine sentiment, identify geographic level, extract topics,
        identify key mentions, assess relevance to the region, and generate actionable insights.
        If the news impacts multiple geographic levels (e.g., local and national), include summaries for all relevant levels (community, city, state, country). If the news impacts only the national level, limit the summary to the country level.
      `,
        },
        // {
        //   role: 'user',
        //   content: `Here is the multiple articles: ${content}. Please provide a combine summary response in the following json format and remove any unexpected token that will cause an error when i will try to parse the response:
        //     {
        //       "title": "The title of the article",
        //       "summaries": [
        //         {"level": "community", "summary": "Community-level summary if applicable."},
        //         {"level": "city", "summary": "City-level summary if applicable."},
        //         {"level": "state", "summary": "State-level summary if applicable."},
        //         {"level": "country", "summary": "Country-level summary if applicable."}
        //       ],
        //       "sentiment": "positive/negative/neutral",
        //       "topics_covered": ["Topic 1", "Topic 2", "Topic 3"],
        //       "key_mentions": [{"entity": "Entity Name", "type": "person/organization/event", "mention_count": 3}],
        //       "relevance_to_region": "high/medium/low",
        //       "actionable_insights": ["Insight 1", "Insight 2"]
        //     }
        //   `,
        // },

        {
          role: 'user',
          content: `
              Here are multiple articles: ${content}. Please provide a combined summary response in raw JSON format. 
              Do not include any extra text, comments, or formatting outside the JSON. Use the following structure:
              {
                "title": "The title of the article(It should match with the content.)",
                "summaries": [
                  {"level": "community", "summary": "Community-level summary if applicable."},
                  {"level": "city", "summary": "City-level summary if applicable."},
                  {"level": "state", "summary": "State-level summary if applicable."},
                  {"level": "country", "summary": "Country-level summary if applicable."}
                ],
                "sentiment": "positive/negative/neutral",
                "topics_covered": ["Topic 1", "Topic 2", "Topic 3"],
                "key_mentions": [{"entity": "Entity Name", "type": "person/organization/event", "mention_count": 3}],
                "relevance_to_region": "high/medium/low",
                "actionable_insights": ["Insight 1", "Insight 2"]
              }

              Requirements:
              - Return only the JSON object, nothing else.
              - Ensure the JSON is valid and parseable.
              - Replace missing or unavailable data with "N/A".
            `,
        },
      ],
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.log('GET NEWS SEARCH ARTICLES SUMMARY', error);
    return null;
  }
};
