'use client';

import React, { useState, useEffect, useRef } from 'react';
import qs from 'query-string';
import { getNewsSearchArticles } from '@/lib/actions';
import SingleRelatedCard from './SingleRelatedCard';
import Loader from '@/components/Loader';

const RelatedArticles = ({ searchQuery, nextPage: initialNextPage }) => {
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(initialNextPage);
  const observerRef = useRef(null);
  const currentSearchQuery = useRef(searchQuery);

  const fetchArticles = async ({ nextPage }) => {
    try {
      // console.log('Current searchQuery:', currentSearchQuery.current);

      const queryParams = qs.stringify(
        {
          q: currentSearchQuery.current,
          page: nextPage,
          apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
        },
        { skipNull: true, skipEmptyString: true }
      );

      const { articles, nextPage: hasMore } = await getNewsSearchArticles({
        queryParams,
      });

      if (articles && articles.length > 0) {
        setArticles((prevArticles) => [...prevArticles, ...articles]);
        setHasMore(hasMore);
      }
    } catch (error) {
      console.log('FETCH GET SUMMARY ARTICLE ERROR', error);
    }
  };

  const loadMoreArticles = () => {
    if (hasMore) fetchArticles({ nextPage: hasMore });
  };

  useEffect(() => {
    currentSearchQuery.current = searchQuery;
    setArticles([]);
    setHasMore(initialNextPage);
    fetchArticles({ nextPage: initialNextPage });
  }, [searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          loadMoreArticles();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore]);

  return (
    <div className='container mx-auto space-y-2'>
      <h2 className='text-2xl font-semibold mb-4'>Related Articles</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {articles.map((article, index) => (
          <SingleRelatedCard {...article} key={index} />
        ))}
      </div>

      {hasMore && (
        <div className='my-5' ref={observerRef}>
          <Loader />
        </div>
      )}

      {!hasMore && (
        <div className='w-full text-center py-4 text-muted-foreground'>
          No more posts to load.
        </div>
      )}
    </div>
  );
};

export default RelatedArticles;
