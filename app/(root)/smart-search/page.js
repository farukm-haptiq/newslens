import React from 'react';
import qs from 'query-string';
import { Search } from 'lucide-react';

import Heading from '@/components/Header';
import NewsSearchForm from './components/NewsSearchForm';
import NewsSearchContainer from './components/NewsSearchContainer';

import { getNewsSearchDataSources, getNewsSearchArticles } from '@/lib/actions';

const NewsSearchPage = async ({ searchParams }) => {
  const query = await searchParams;

  const searchQuery = query.search || 'india vs aus test match';
  const domain = query.source === 'all' ? null : query.source;
  const country = query.country === 'all' ? null : query.country;
  const category = query.category === 'all' ? null : query.category;

  const queryParams = qs.stringify(
    {
      q: searchQuery,
      country: country || undefined,
      category: category || undefined,
      domain: domain || undefined,
      apiKey: process.env.NEWS_DATA_IO_API_KEY,
    },
    { skipNull: true, skipEmptyString: true }
  );

  const newsSources = await getNewsSearchDataSources();

  const { articles, nextPage } = await getNewsSearchArticles({ queryParams });

  return (
    <div className='space-y-10'>
      <Heading
        title='Smart Search'
        description='Search, summarize, and scroll endlessly.'
        icon={Search}
        iconColor='text-pink-700'
        bgColor='bg-pink-700/10'
      />

      <NewsSearchForm
        initialSearch={searchQuery}
        initialSource={domain}
        initialCountry={country}
        newsSources={newsSources}
        initialCategory={category}
      />

      <NewsSearchContainer
        articles={articles}
        nextPage={nextPage}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default NewsSearchPage;
