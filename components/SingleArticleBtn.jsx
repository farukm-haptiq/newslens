'use client';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const SingleArticleBtn = ({ url }) => {
  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem('singleArticle', JSON.stringify(url));
    router.push('/singleArticle');
  };
  return <Button onClick={handleClick}>Read Article</Button>;
};

export default SingleArticleBtn;
