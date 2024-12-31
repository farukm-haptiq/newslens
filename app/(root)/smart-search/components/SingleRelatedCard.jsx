import { CalendarIcon, NewspaperIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import defaultImage from '@/app/assets/images/default-img.jpg';
import ArticleImageContainer from '@/components/ArticleImageContainer';
import ArticleSourceIconContainer from '@/components/ArticleSourceIconContainer';

const SingleRelatedNewsCard = ({
  title,
  description,
  image_url,
  source_name,
  source_icon,
  pubDate,
  category,
  link,
}) => {
  return (
    <Card className='w-full max-w-2xl overflow-hidden transition-all hover:shadow-lg'>
      <ArticleImageContainer
        title={title}
        image_url={image_url || defaultImage}
        className='h-48'
      />
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <ArticleSourceIconContainer
              className={'size-6'}
              icon={source_icon}
              alt={source_name}
            />
            <CardDescription>{source_name}</CardDescription>
          </div>
          {category && category.length > 0 && (
            <Badge variant='secondary' className='text-xs'>
              {category[0]}
            </Badge>
          )}
        </div>
        <CardTitle className='line-clamp-2 text-xl'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className='line-clamp-3'>
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className='flex items-center justify-between'>
        <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
          <CalendarIcon className='h-4 w-4' />
          <span>{new Date(pubDate).toLocaleDateString()}</span>
        </div>
        <Button variant='outline' asChild>
          <a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center space-x-2'
          >
            <NewspaperIcon className='h-4 w-4' />
            <span>Read More</span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SingleRelatedNewsCard;
