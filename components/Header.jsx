import { cn } from '@/lib/utils';
import React from 'react';
import { TextShimmer } from './ui/text-shimmer';

const Heading = ({ title, description, icon: Icon, iconColor, bgColor }) => {
  return (
    <div className='flex items-center gap-x-3 mb-8'>
      <div className={cn('p-2  rounded-md', bgColor)}>
        <Icon className={cn('w-10 h-10', iconColor)} />
      </div>

      <div>
        <h2 className='text-3xl font-bold tracking-wider'>
          <TextShimmer className={'text-primary/50'}>{title}</TextShimmer>
        </h2>
        <p className='text-sm text-muted-foreground tracking-wide'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default Heading;
