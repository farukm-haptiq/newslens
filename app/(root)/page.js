'use client';

import { motion } from 'framer-motion';

import {
  ArrowRight,
  FilePlus2,
  FileScanIcon,
  Link,
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

  return (
    <div className='space-y-10'>
      <div className='space-y-5'>
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='flex items-center gap-x-4'
              >
                <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                  <tool.icon className={cn('w-8 h-8', tool.color)} />
                </div>
                <div className='font-semibold'>{tool.label}</div>
              </motion.div>
              <ArrowRight className='w-5 h-5' />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashBoardPage;
