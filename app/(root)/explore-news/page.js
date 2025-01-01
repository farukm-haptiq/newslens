import qs from 'query-string';

import ArticlesWrapper from './components/ArticlesWrapper';
import { getArticles, getNewsApiSources } from '@/lib/actions';
import { FilePlus2 } from 'lucide-react';
import Heading from '@/components/Header';

const HomePage = async ({ searchParams }) => {
  const query = await searchParams;
  const searchQuery = query.search || 'india';
  const source = query.source === 'all' ? null : query.source;
  const sortBy = query.sortBy;

  const queryParams = qs.stringify(
    {
      q: searchQuery,
      sortBy: sortBy || undefined,
      sources: source || undefined,
      apiKey: process.env.NEWS_API_KEY,
    },
    { skipNull: true, skipEmptyString: true }
  );

  const response = await getArticles(queryParams);

  if (!response) {
    return <h1 className='text-7xl text-slate-800'>fail to get articles!</h1>;
  }

  const newsSources = await getNewsApiSources();

  const articles = response.data.articles;

  return (
    <div className='space-y-5'>
      <Heading
        title='Explore news'
        description='Discover and summarize articles with a click.'
        icon={FilePlus2}
        iconColor='text-violet-700'
        bgColor='bg-violet-700/10'
      />

      <ArticlesWrapper
        articles={articles}
        newsSources={newsSources}
        searchQuery={searchQuery}
        source={source}
        sortBy={sortBy}
      />
    </div>
  );
};

export default HomePage;
