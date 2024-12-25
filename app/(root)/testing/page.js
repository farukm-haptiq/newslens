// import { NextResponse } from 'next/server';

// import { load } from 'cheerio';
// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_API_KEY,
// });

// const Test = async () => {
//   const title = 'cricket in india';

//   // Fetch search results
//   const searchUrl = `https://news.google.com/search?q=${encodeURIComponent(
//     title
//   )}&hl=en-US&gl=US&ceid=US:en`;

//   const response = await fetch(searchUrl);

//   if (!response.ok) {
//     throw new Error(`Failed to fetch news: ${response.statusText}`);
//   }

//   const html = await response.text();

//   // Parse HTML and extract relevant information
//   const $ = load(html);
//   const articles = $('article')
//     .map((_, el) => {
//       const $el = $(el);

//       return {
//         title: $el.find('h3').text(),
//         snippet: $el.find('.HO8did').text(),
//         link: 'https://news.google.com' + $el.find('a').attr('href')?.slice(1),
//       };
//     })
//     .get()
//     .slice(0, 3);

//   if (articles.length === 0) {
//     return <h1>No articles found</h1>;
//   }

//   console.log(articles);

//   return <>Testing</>;

//   // Generate summary using AI
//   const prompt = `Summarize the following news articles related to "${title}":

// ${articles
//   .map(
//     (article, index) => `
// Article ${index + 1}:
// Title: ${article.title}
// Snippet: ${article.snippet}
// Link: ${article.link}
// `
//   )
//   .join('\n')}

// Provide a concise summary of the main points and any relevant context.`;

//   let summaryResponse;
//   try {
//     summaryResponse = await openai.chat.completions.create({
//       // model: 'gpt-3.5-turbo',
//       model: 'gpt-4o-mini',

//       messages: [
//         {
//           role: 'system',
//           content:
//             'You are an AI assistant that summarizes news articles and analyzes key data from them. Your task is to provide a summary, determine sentiment, identify geographic level, extract topics, identify key mentions, assess relevance to the region, and generate actionable insights.',
//         },
//         {
//           role: 'user',
//           content: prompt,
//         },
//       ],
//     });
//   } catch (error) {
//     console.log('GET SINGLE NEWS SUMMARY', error);
//   }

//   console.log({ summaryResponse });

//   return (
//     <div>
//       <h1>Testing</h1>
//       <p>{summaryResponse?.choices[0].message.content}</p>
//     </div>
//   );
// };

// export default Test;

// import { NextResponse } from 'next/server';
// import { load } from 'cheerio';

// async function fetchArticleContent(url: string) {
//   try {
//     const response = await fetch(url);
//     const html = await response.text();
//     const $ = load(html);

//     // Remove unwanted elements
//     $('script').remove();
//     $('style').remove();
//     $('nav').remove();
//     $('header').remove();
//     $('footer').remove();

//     // Get the main content
//     const content = $(
//       'article, [role="main"], .article-content, .story-content'
//     )
//       .first()
//       .text()
//       .trim()
//       .replace(/\s+/g, ' ');

//     return content || 'Content could not be extracted';
//   } catch (error) {
//     console.error('Error fetching article content:', error);
//     return 'Failed to fetch article content';
//   }
// }

import { load } from 'cheerio';
const Test = async () => {
  try {
    const searchQuery = 'test cricket';

    // Fetch from Google News
    const searchUrl = `https://news.google.com/search?q=${encodeURIComponent(
      searchQuery
    )}&hl=en-US&gl=US&ceid=US:en`;
    const response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = load(html);

    // Get articles from different publications
    const articles = await Promise.all(
      $('article')
        .map(async (_, el) => {
          const $el = $(el);
          const link =
            'https://news.google.com' + $el.find('a').attr('href')?.slice(1);
          const source = $el.find('time').parent().find('a').first().text();

          return {
            title: $el.find('h3').text().trim(),
            snippet: $el.find('.HO8did').text().trim(),
            source,
            link,
            content: await fetchArticleContent(link),
          };
        })
        .get()
        .slice(0, 5) // Limit to 5 articles
    );

    if (articles.length === 0) {
      return <h1>No articles found</h1>;
    }

    console.log(articles);
  } catch (error) {
    console.error('Error in news API:', error);
  }
};

export default Test;

async function fetchArticleContent(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = load(html);

    // Remove unwanted elements
    $('script').remove();
    $('style').remove();
    $('nav').remove();
    $('header').remove();
    $('footer').remove();

    // Get the main content
    const content = $(
      'article, [role="main"], .article-content, .story-content'
    )
      .first()
      .text()
      .trim()
      .replace(/\s+/g, ' ');

    return content || 'Content could not be extracted';
  } catch (error) {
    console.error('Error fetching article content:', error);
    return 'Failed to fetch article content';
  }
}
