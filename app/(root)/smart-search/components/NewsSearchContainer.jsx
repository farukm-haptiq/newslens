import {
  getNewsSearchArticlesContent,
  getNewsSearchArticlesSummary,
} from '@/lib/actions';

import NewsSearchSummary from '@/components/NewsSearchSummary';
import SingleNewsSearchArticleCard from './SingleNewsSearchArticleCard';
import RelatedArticles from './RelatedArticles';

const NewsSearchContainer = async ({ articles, nextPage, searchQuery }) => {
  if (!articles || articles.length <= 0) {
    return (
      <div className='space-y-2 p-6'>
        <h1 className='text-2xl '>
          No Search Articles found with your search query...
        </h1>
      </div>
    );
  }

  const urls = articles.map((article) => article.link);
  const articlesContent = await getNewsSearchArticlesContent(urls);
  const summary = await getNewsSearchArticlesSummary(articlesContent);

  return (
    <>
      <h2 className='text-2xl font-semibold mb-4'>Articles</h2>
      {articles.map((article, index) => {
        return <SingleNewsSearchArticleCard key={index} article={article} />;
      })}

      {summary ? (
        <NewsSearchSummary {...summary} />
      ) : (
        <h1 className='text-2xl '>Fail to get summary of your articles...</h1>
      )}

      <RelatedArticles searchQuery={searchQuery} nextPage={nextPage} />
    </>
  );
};

export default NewsSearchContainer;
