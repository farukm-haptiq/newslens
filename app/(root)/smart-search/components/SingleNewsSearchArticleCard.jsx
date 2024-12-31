'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  ExternalLink,
  Tag,
  Newspaper,
} from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import defaultImage from '@/app/assets/images/default-img.jpg';
import ArticleImageContainer from '@/components/ArticleImageContainer';

const SingleNewsSearchArticleCard = ({ article }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Date unavailable';
    }
  };

  return (
    <Card className='group mb-6 overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/5 hover:scale-[1.01]'>
      <CardHeader className='pb-3'>
        <div className='my-2 flex flex-col lg:flex-row gap-5 '>
          <div className='space-y-2 flex-1'>
            <div className='flex items-center gap-2'>
              {article.source_name && (
                <HoverCard>
                  <HoverCardTrigger>
                    <Badge
                      variant='outline'
                      className='transition-colors hover:bg-primary/5'
                    >
                      <Newspaper className='w-3 h-3 mr-1' />
                      {article.source_name}
                    </Badge>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>
                        {article.source_name}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Priority: {article.source_priority}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              )}
            </div>
            <CardTitle className='text-xl font-bold leading-tight transition-colors group-hover:text-primary'>
              {article.title}
            </CardTitle>
          </div>
          {article.image_url && (
            <ArticleImageContainer
              image_url={article.image_url || defaultImage}
              title={article.title}
              className=' h-44 lg:w-48 lg:h-32 rounded-lg  shadow-lg transition-transform group-hover:scale-105'
            />
          )}
        </div>
        <div className='flex items-center gap-3 text-sm text-muted-foreground mt-2'>
          <div className='flex items-center gap-1.5'>
            <Clock className='w-4 h-4' />
            <span>{formatDate(article.pubDate)}</span>
          </div>
          {article.country && article.country.length > 0 && (
            <div className='flex items-center gap-1.5'>
              <Globe className='w-4 h-4' />
              <span className='capitalize'>{article.country.join(', ')}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className='pb-2'>
        <CardDescription className='text-sm leading-relaxed'>
          {article.description}
        </CardDescription>

        {isExpanded && (
          <div className='mt-4 space-y-4 animate-in slide-in-from-top-2 duration-200'>
            {article.category && article.category.length > 0 && (
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm font-medium'>
                  <Tag className='w-4 h-4' />
                  <span>Categories</span>
                </div>
                <div className='flex flex-wrap gap-1.5'>
                  {article.category.map((cat, idx) => (
                    <Badge
                      key={idx}
                      variant='secondary'
                      className='capitalize transition-colors hover:bg-secondary/80'
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <Separator className='my-4' />
            {article.source_url && (
              <Button asChild variant='outline' className='px-4'>
                <a
                  href={article.source_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Read full article'
                >
                  Read full article
                  <ExternalLink className='h-4 w-4' />
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className='pt-0'>
        <Button
          variant='ghost'
          className='w-full justify-center hover:bg-primary transition-colors'
          onClick={toggleExpand}
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className='ml-2 h-4 w-4' />
            </>
          ) : (
            <>
              Read More <ChevronDown className='ml-2 h-4 w-4' />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SingleNewsSearchArticleCard;
