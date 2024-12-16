import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

import OpenAI from 'openai';
import BackBtn from '@/components/BackBtn';

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});
const SingleArticle = async () => {
  // NEWS API
  const newsUrl = `https://newsapi.org/v2/everything?q=india+pune&apiKey=${process.env.NEWS_API_KEY}`;

  const r1 = await axios(newsUrl);

  const firstResult = r1.data.articles[0];

  // Fetch the article URL content
  const r2 = await axios.get(firstResult.url);

  // Use jsdom to parse the HTML content
  const dom = new JSDOM(r2.data, { url: firstResult.url });

  // Use Readability to extract the clean text content
  // Readability is designed to do exactly that — it parses the article's HTML and extracts the main content, removing extraneous elements like ads, sidebars, and navigation. It should provide you with the main text of the article directly from the textContent property.
  const article = new Readability(dom.window.document).parse();
  // After calling Readability.parse(), you can access the textContent or title properties, which already contain clean content, meaning you don't need extra cleaning from cheerio or jsdom unless you're doing additional DOM manipulations.

  if (!article) {
    return (
      <h1 className='text-5xl text-slate-800 text-center'>
        ail to fetch single article{' '}
      </h1>
    );
  }

  const cleanText = article.textContent.trim();

  const response = await openai.chat.completions.create({
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

  return (
    <div className='p-5 space-y-4 text-justify'>
      <BackBtn />
      <p>{cleanText}</p>

      <h4>Summary</h4>
      <p>{response.choices[0].message.content}</p>
    </div>
  );
};

export default SingleArticle;

// 'use client';

// const page = () => {
//   const url = JSON.parse(localStorage.getItem('singleArticle'));
//   return <div>page {url}</div>;
// };

// export default page;
