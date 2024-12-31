import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';

import Image from 'next/image';

import defaultImage from '@/app/assets/images/default-img.jpg';

const ArticleCardImageContainer = ({ article }) => {
  const [imgSrc, setImgSrc] = useState(article.urlToImage || defaultImage);

  useEffect(() => {
    setImgSrc(article.urlToImage || defaultImage);
  }, [article]);

  return (
    <div className='aspect-video relative overflow-hidden'>
      <Image
        src={imgSrc}
        alt={article.title}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        className='object-cover transition-transform duration-300 group-hover:scale-105'
        priority={false}
        onError={(e) => {
          setImgSrc(defaultImage);
        }}
      />
      {article.source?.name && (
        <Badge
          variant='secondary'
          className='absolute top-4 left-4 bg-background/80 backdrop-blur-sm'
        >
          {article.source.name}
        </Badge>
      )}
    </div>
  );
};

export default ArticleCardImageContainer;
