import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

import OpenAI from 'openai';

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

    const article = new Readability(dom.window.document).parse();

    // Use Readability to extract the clean text content
    // Readability is designed to do exactly that — it parses the article's HTML and extracts the main content, removing extraneous elements like ads, sidebars, and navigation. It should provide you with the main text of the article directly from the textContent property.
    // After calling Readability.parse(), you can access the textContent or title properties, which already contain clean content, meaning you don't need extra cleaning from cheerio or jsdom unless you're doing additional DOM manipulations.

    return article;
  } catch (error) {
    console.log('GET SINGLE ARTICLE CONTENT', error);
    return null;
  }
};

export const getSummary = async (cleanText) => {
  try {
    const summaryResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that summarizes news articles.',
        },
        {
          role: 'user',
          content: `Here is the article: ${cleanText}`,
        },
      ],
    });

    return summaryResponse;
  } catch (error) {
    console.log('GET SINGLE NEWS SUMMARY', error);

    return null;
  }
};
