'use client';

import Image from 'next/image';

import defaultImage from '@/app/assets/images/default-img.jpg';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const ArticleSourceIconContainer = ({ className, icon, alt }) => {
  const [iconSrc, setIconSrc] = useState(icon || defaultImage);

  useEffect(() => {
    setIconSrc(icon);
  }, [icon]);

  return (
    <div className={cn('relative', className)}>
      <Image
        src={iconSrc}
        alt={alt}
        fill
        className='rounded-full'
        onError={(e) => {
          setIconSrc(defaultImage);
        }}
      />
    </div>
  );
};

export default ArticleSourceIconContainer;
