import Link from 'next/link';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { ExternalLink, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

import ArticleCardImageContainer from './ArticleCardImageContainer';

export function ArticleCard({ article }) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <Card className='group h-full flex flex-col overflow-hidden border-muted bg-card hover:shadow-xl transition-all duration-300'>
      <CardHeader className='p-0'>
        <ArticleCardImageContainer article={article} />
      </CardHeader>
      <CardContent className='flex-grow p-6'>
        <div className='space-y-4'>
          {article.author && (
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <User className='h-4 w-4' />
              <span>{article.author} </span>
            </div>
          )}
          {formattedDate && (
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Clock className='h-4 w-4' />
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </div>
          )}
          <p
            className={cn(
              'text-base/relaxed text-muted-foreground',
              'line-clamp-3'
            )}
          >
            {article.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className='p-6 pt-0 gap-4'>
        <Button
          asChild
          // className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all'
          className='w-full text-primary-foreground bg-primary hover:bg-primary/50 shadow-lg hover:shadow-xl'
        >
          <Link
            href={{
              pathname: '/explore-news/singleArticle',
              query: { url: encodeURIComponent(article.url) },
            }}
          >
            Get Summary
          </Link>
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button asChild variant='outline' size='icon' className='px-4'>
                <a
                  href={article.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Read full article'
                >
                  <ExternalLink className='h-4 w-4' />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side='bottom'>Read full article</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
