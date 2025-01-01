'use client';

import { useState } from 'react';

import NewsSearchSummary from '@/components/NewsSearchSummary';
import UrlAnalysisForm from './UrlAnalysisForm';

import { isValidUrl } from '@/lib/utils';
import {
  getNewsSearchArticlesSummary,
  getNewsSearchArticlesContent,
} from '@/lib/actions';
import Loader from '@/components/Loader';

const UrlAnalysisWrapper = () => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [urls, setUrls] = useState(['']);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = urls.map((url) =>
      isValidUrl(url) ? '' : 'Invalid URL'
    );

    setErrors(validationErrors);

    if (validationErrors.some((error) => error)) {
      console.log('Form submission blocked due to invalid URLs');
      return;
    }

    setIsLoading(true);
    try {
      const articlesContent = await getNewsSearchArticlesContent(urls);
      const data = await getNewsSearchArticlesSummary(articlesContent);
      setSummary(data);
    } catch (error) {
      console.log('GET URL ANALYSIS SUMMARY ERROR', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <UrlAnalysisForm
        urls={urls}
        setUrls={setUrls}
        errors={errors}
        setErrors={setErrors}
        handleSubmit={handleSubmit}
      />

      {isLoading && <Loader />}

      {summary && <NewsSearchSummary {...summary} />}
    </>
  );
};

export default UrlAnalysisWrapper;
