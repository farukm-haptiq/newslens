'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import defaultImage from '@/app/assets/images/default-img.jpg';
import { cn } from '@/lib/utils';

const ArticleImageContainer = ({ image_url, title, className }) => {
  const [imgSrc, setImgSrc] = useState(image_url || defaultImage);

  useEffect(() => {
    setImgSrc(image_url);
  }, [image_url]);

  return (
    <div className={cn('relative  w-full overflow-hidden', className)}>
      <Image
        src={imgSrc}
        alt={title}
        layout='fill'
        objectFit='cover'
        className='transition-transform duration-300 ease-in-out hover:scale-105'
        onError={(e) => {
          setImgSrc(defaultImage);
        }}
      />
    </div>
  );
};

export default ArticleImageContainer;
