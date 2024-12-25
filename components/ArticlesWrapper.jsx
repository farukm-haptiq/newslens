'use client';

import qs from 'query-string';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from './ui/button';

import SearchInput from './SearchInput';
import SelectSort from './SortBy';
import ComboboxSource from './SourceCombobox';
import PaginationWrapper from './PaginationWrapper';
import { ArticleCard } from './ArticleCard';

const ARTICLES_PER_PAGE = 12; // Number of articles per page

const ArticleWrapper = ({
  articles,
  newsSources,
  searchQuery,
  sources,
  sortBy,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages) {
      const existingQuery = qs.parse(window.location.search);
      const query = { ...existingQuery, page: 1 };
      const url = qs.stringifyUrl(
        {
          url: window.location.href,
          query,
        },
        { skipNull: true }
      );

      router.push(url);
    }
  }, [articles, currentPage, searchParams, router]);

  return (
    <div className='bg-background p-10 space-y-5'>
      <h1 className='text-7xl font-extrabold'>
        <span className='gradient-text'>Newslens</span>
      </h1>
      <p>– A sharper perspective on the news.</p>
      <SearchInput searchText={searchQuery} />
      <ComboboxSource newsSources={newsSources} source={sources} />
      <SelectSort sortBy={sortBy} />

      {articles.length <= 0 && (
        <h1 className='text-5xl text-slate-800 text-center'>
          Oops! no result match your query.
        </h1>
      )}

      <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3 '>
        {currentArticles.map((article, index) => {
          return <ArticleCard key={index} article={article} />;
        })}
      </div>

      {/* Pagination Controls */}
      {/* {totalPages > 1 && currentPage <= totalPages && ( */}
      <PaginationWrapper
        articles={articles}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      {/* )} */}
    </div>
  );
};

export default ArticleWrapper;
