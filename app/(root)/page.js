'use client';

import {
  ArrowRight,
  FilePlus2,
  FileScanIcon,
  Link,
  NewspaperIcon,
  Search,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { BorderTrail } from '@/components/ui/border-trail';

const tools = [
  {
    label: 'Explore News',
    href: '/explore-news',
    icon: FilePlus2,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Smart Search',
    href: '/smart-search',
    icon: Search,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    label: 'Scan Print Media',
    href: '/scan',
    icon: FileScanIcon,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
  },
  {
    label: 'Analyze URL',
    href: '/url-analysis',
    icon: Link,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
];

const DashBoardPage = () => {
  const router = useRouter();

  // return (
  //   <div className='relative flex h-[200px] w-[300px] flex-col items-center justify-center rounded-md bg-zinc-200 px-5 py-2 dark:bg-zinc-800'>
  //     <BorderTrail
  //       style={{
  //         boxShadow:
  //           '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
  //       }}
  //       size={100}
  //     />
  //     <div
  //       className='flex h-full animate-pulse flex-col items-start justify-center space-y-2'
  //       role='status'
  //       aria-label='Loading...'
  //     >
  //       <div className='h-1 w-4 rounded-[4px] bg-zinc-600'></div>
  //       <div className='h-1 w-10 rounded-[4px] bg-zinc-600'></div>
  //       <div className='h-1 w-12 rounded-[4px] bg-zinc-600'></div>
  //       <div className='h-1 w-12 rounded-[4px] bg-zinc-600'></div>
  //       <div className='h-1 w-12 rounded-[4px] bg-zinc-600'></div>
  //     </div>
  //   </div>
  // );
  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          <TextShimmer duration={1.2}>Explore the power of AI</TextShimmer>
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          A sharper perspective on the news - Experience the power of AI
        </p>
      </div>

      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {tools.map((tool, index) => {
          return (
            <Card
              onClick={() => router.push(tool.href)}
              key={tool.label}
              className='relative overflow-hidden p-4 border-black/5 flex items-center justify-between hover:shadow-lg transition cursor-pointer'
            >
              <BorderTrail
                style={{
                  boxShadow:
                    '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
                }}
                size={100}
              />
              <div className='flex items-center gap-x-4'>
                <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                  <tool.icon className={cn('w-8 h-8', tool.color)} />
                </div>
                <div className='font-semibold'>{tool.label}</div>
              </div>
              <ArrowRight className='w-5 h-5' />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashBoardPage;
