'use client';
import Image from 'next/image';
import { useState } from 'react';

import defaultImage from '@/app/assets/images/default-img.jpg';

import { AspectRatio } from '@/components/ui/aspect-ratio';

const SingleArticleSummaryImage = ({ img }) => {
  const [imgSrc, setImgSrc] = useState(img || defaultImage);
  return (
    <div className='max-w-2xl mx-auto'>
      <AspectRatio ratio={16 / 9} className='bg-muted'>
        <Image
          src={imgSrc}
          alt='Article Image'
          fill
          className='rounded-md object-cover'
          priority
          onError={(e) => {
            setImgSrc(defaultImage);
          }}
        />
      </AspectRatio>
    </div>
  );
};

export default SingleArticleSummaryImage;
