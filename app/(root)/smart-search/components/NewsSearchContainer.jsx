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
      <h1 className='text-5xl text-slate-800 text-center'>
        Oops! no result match your query.
      </h1>
    );
  }

  const urls = articles.map((article) => article.link);
  const articlesContent = await getNewsSearchArticlesContent(urls);
  const summary = await getNewsSearchArticlesSummary(articlesContent);

  return (
    <div className='space-y-10'>
      <div className='space-y-4'>
        <h2 className='text-2xl font-semibold'>Articles</h2>
        {articles.map((article, index) => {
          return <SingleNewsSearchArticleCard key={index} article={article} />;
        })}

        {summary ? (
          <NewsSearchSummary {...summary} />
        ) : (
          <h1 className='text-2xl '>Fail to get summary of your articles...</h1>
        )}
      </div>

      <RelatedArticles searchQuery={searchQuery} nextPage={nextPage} />
    </div>
  );
};

export default NewsSearchContainer;
