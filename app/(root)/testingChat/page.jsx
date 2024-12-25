// import axios from 'axios';
// import * as cheerio from 'cheerio';

// const News = async () => {
//   const title = 'cricket in india';

//   // Fetch search results
//   const searchUrl = `https://news.google.com/search?q=${encodeURIComponent(
//     title
//   )}&hl=en-US&gl=US&ceid=US:en`;

//   try {
//     const response = await axios.get(searchUrl);

//     if (response.status !== 200) {
//       throw new Error(`Failed to fetch news: ${response.statusText}`);
//     }

//     const html = response.data;

//     // Parse HTML and extract relevant information
//     const $ = cheerio.load(html);
//     const articles = $('article')
//       .map((_, el) => {
//         const $el = $(el);
//         return {
//           title: $el.find('h3').text(),
//           snippet: $el.find('.HO8did').text(),
//           link:
//             'https://news.google.com' + $el.find('a').attr('href')?.slice(1),
//         };
//       })
//       .get()
//       .slice(0, 5); // Limit to top 5 articles for now

//     // Fetch and display content for each article
//     const articlesWithContent = await Promise.all(
//       articles.map(async (article) => {
//         try {
//           const articleResponse = await axios.get(article.link);
//           const articleHtml = articleResponse.data;
//           const $articlePage = cheerio.load(articleHtml);

//           // Extract text content (this selector may vary based on publication)
//           const content = $articlePage('p').text();
//           return { ...article, content };
//         } catch (error) {
//           console.error(
//             `Failed to fetch article content: ${article.link}`,
//             error
//           );
//           return { ...article, content: 'Content could not be fetched.' };
//         }
//       })
//     );

//     return (
//       <div>
//         <h1>Top News on "{title}"</h1>
//         <ul>
//           {articlesWithContent.map((article, index) => (
//             <li key={index}>
//               <h2>{article.title}</h2>
//               <p>{article.snippet}</p>
//               <p>{article.content}</p>
//               <a href={article.link} target='_blank' rel='noopener noreferrer'>
//                 Read More
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     return <h1>Failed to load articles.</h1>;
//   }
// };

// export default News;

import axios from 'axios';
import * as cheerio from 'cheerio';

const fetchNewsBySource = async (title, source) => {
  const searchUrl = `https://news.google.com/search?q=${encodeURIComponent(
    title
  )}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const response = await axios.get(searchUrl);
    const html = response.data;

    // Parse HTML and extract relevant information
    const $ = cheerio.load(html);
    const articles = $('article')
      .map((_, el) => {
        const $el = $(el);
        const title = $el.find('h2').text();
        const link =
          'https://news.google.com' + $el.find('a').attr('href')?.slice(1);
        const publication = $el.find('.wEwyrc').text(); // Extract publication name

        return { title, link, publication };
      })
      .get();
    console.log(articles);

    // Filter articles by source
    const filteredArticles = articles.filter(
      (article) => article.publication.toLowerCase() === source.toLowerCase()
    );

    return filteredArticles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

// Usage example
const News = async () => {
  const title = 'cricket in india';
  const source = 'the times of india'; // Specify the publication here
  const articles = await fetchNewsBySource(title, source);

  if (articles.length === 0) {
    return (
      <h1>
        No articles found for "{title}" from "{source}"
      </h1>
    );
  }

  return (
    <div>
      <h1>
        Articles on "{title}" from "{source}"
      </h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <h2>{article.title}</h2>
            <p>Source: {article.publication}</p>
            <a href={article.link} target='_blank' rel='noopener noreferrer'>
              Read More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
