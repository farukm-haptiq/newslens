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

import Img from '@/app/assets/images/default-img.jpg';

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
    <div className='p-10 space-y-5'>
      <h1 className='text-7xl font-extrabold'>Newslens</h1>
      <p>– A sharper perspective on the news.</p>
      <SearchInput searchText={searchQuery} />
      <ComboboxSource newsSources={newsSources} source={sources} />
      <SelectSort sortBy={sortBy} />

      {articles.length <= 0 && (
        <h1 className='text-5xl text-slate-800 text-center'>
          Oops! no result match your query.
        </h1>
      )}

      <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {currentArticles.map((article, index) => (
          <div
            key={index}
            className='bg-gray-200 px-4 space-y-2 py-2 rounded-md shadow-md  transition hover:shadow-lg'
          >
            <div className='relative w-full h-64'>
              <Image
                fill
                src={article.urlToImage || Img}
                alt='Article Img'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                priority={false}
                className='rounded-xl object-cover'
              />
            </div>
            <h5 className='text-xl text-slate-900'>
              published by:{' '}
              <span className='font-bold text-red-500'>{article.author}</span>
            </h5>
            <h6 className='text-slate-700'>source: {article.source?.name}</h6>
            <p>{article.description}</p>

            <Button asChild>
              <Link
                href={{
                  pathname: '/singleArticle',
                  query: { url: encodeURIComponent(article.url) },
                }}
              >
                Get Summary
              </Link>
            </Button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && currentPage <= totalPages && (
        <PaginationWrapper
          articles={articles}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default ArticleWrapper;
