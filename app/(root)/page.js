import qs from 'query-string';

import ArticlesWrapper from '@/components/ArticlesWrapper';
import { getArticles, getNewsSources } from '@/lib/actions';

const HomePage = async ({ searchParams }) => {
  const query = await searchParams;
  const searchQuery = query.search || 'india';
  const sources = query.sources === 'all' ? null : query.sources;
  const sortBy = query.sortBy;

  const queryParams = qs.stringify(
    {
      q: searchQuery,
      sortBy: sortBy || undefined,
      sources: sources || undefined,
      apiKey: process.env.NEWS_API_KEY,
    },
    { skipNull: true, skipEmptyString: true }
  );

  const response = await getArticles(queryParams);

  if (!response?.data.articles) {
    return (
      <h1 className='text-7xl text-slate-800'>
        fail to get articles! try after some time
      </h1>
    );
  }

  const newsSources = await getNewsSources();

  const articles = response.data.articles;

  return (
    <ArticlesWrapper
      articles={articles}
      newsSources={newsSources}
      searchQuery={searchQuery}
      sources={sources}
      sortBy={sortBy}
    />
  );
};

export default HomePage;
