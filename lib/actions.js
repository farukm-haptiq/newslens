import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

import OpenAI from 'openai';
import { extractImageURL } from './helper';

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export const getArticles = async (queryParams) => {
  try {
    const newsUrl = `https://newsapi.org/v2/everything?${queryParams}`;
    const response = await axios(newsUrl);
    return response;
  } catch (error) {
    console.log('FETCH ARTICLES ERROR', error);
    return null;
  }
};

export const getNewsSources = async () => {
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

export const getSingleArticle = async (url) => {
  try {
    const response = await axios.get(url);
    if (!response.data) return null;
    const dom = new JSDOM(response.data, { url }); // Use jsdom to parse the HTML content

    // console.log('hello', article);
    const article = new Readability(dom.window.document).parse();

    const imgUrl = extractImageURL(article?.content);

    // Use Readability to extract the clean text content
    // Readability is designed to do exactly that — it parses the article's HTML and extracts the main content, removing extraneous elements like ads, sidebars, and navigation. It should provide you with the main text of the article directly from the textContent property.
    // After calling Readability.parse(), you can access the textContent or title properties, which already contain clean content, meaning you don't need extra cleaning from cheerio or jsdom unless you're doing additional DOM manipulations.

    return { article: article || null, imgUrl };
  } catch (error) {
    console.log('GET SINGLE ARTICLE CONTENT', error);
    return null;
  }
};

export const getSummary = async (cleanText) => {
  try {
    const summaryResponse = await openai.chat.completions.create({
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
          content: `Here is the article ${cleanText}. Please provide a response in the following format: {"title": "The title of the article", "summary": "A brief summary of the article's key points.", "sentiment": "positive/negative/neutral", "geographic_level": "community/city/state/country", "topics_covered": ["Topic 1", "Topic 2", "Topic 3"], "key_mentions": [{"entity": "Entity Name", "type": "person/organization/event", "mention_count": 3}], "relevance_to_region": "high/medium/low", "actionable_insights": ["Insight 1", "Insight 2"]}`,
        },
      ],
    });

    return summaryResponse;
  } catch (error) {
    console.log('GET SINGLE NEWS SUMMARY', error);

    return null;
  }
};
