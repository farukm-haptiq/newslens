import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import defaultImage from '@/app/assets/images/default-img.jpg';
import { useState } from 'react';

export function ArticleCard({ article }) {
  const [imgSrc, setImgSrc] = useState(article.urlToImage || defaultImage);

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
          className='w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all'
        >
          <Link
            href={{
              pathname: '/all-news/singleArticle',
              query: { url: encodeURIComponent(article.url) },
            }}
          >
            Get Summary
          </Link>
        </Button>
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
      </CardFooter>
    </Card>
  );
}
