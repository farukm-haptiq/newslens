import { getSingleArticle, getSummary } from '@/lib/actions';
import BackBtn from '@/components/BackBtn';
import Image from 'next/image';

import Img from '@/app/assets/images/default-img.jpg';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ArticlePage = async ({ searchParams }) => {
  const { url } = await searchParams;
  const { article, imgUrl } = await getSingleArticle(decodeURIComponent(url));

  console.log({ imgUrl });

  if (!article)
    return (
      <div className='space-y-3 p-5'>
        <h1 className='text-5xl '>
          Content not found related to your article...
        </h1>
        <BackBtn />
      </div>
    );

  const cleanText = article.textContent.trim();

  const summaryResponse = await getSummary(cleanText);
  let summary = summaryResponse?.choices[0].message.content;

  if (!summary) {
    return (
      <div className='space-y-3 p-5 '>
        <h1 className='text-5xl '>Fail to get summary of your article...</h1>
        <BackBtn />
      </div>
    );
  }

  summary = JSON.parse(summary);

  return (
    <div className='container mx-auto py-8 space-y-6 p-5 text-justify'>
      <BackBtn />

      <Separator />

      <div className='max-w-2xl mx-auto'>
        <AspectRatio ratio={16 / 9} className='bg-muted'>
          <Image
            src={imgUrl || Img}
            alt='Article Image'
            fill
            className='rounded-md object-cover'
            priority
          />
        </AspectRatio>
      </div>

      <div className='grid gap-8 md:grid-cols-2 items-start mt-10'>
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>{cleanText}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold'>{summary.title}</h3>
              <p className='mt-2 text-sm text-muted-foreground'>
                {summary.summary}
              </p>
            </div>

            <div>
              <h4 className='text-sm font-semibold'>Sentiment</h4>
              <p className='mt-1 text-sm'>{summary.sentiment}</p>
            </div>

            <div>
              <h4 className='text-sm font-semibold'>Geographic Level</h4>
              <p className='mt-1 text-sm'>{summary.geographic_level}</p>
            </div>

            <div>
              <h4 className='text-sm font-semibold'>Topics Covered</h4>
              <ul className='mt-2 space-y-1'>
                {summary.topics_covered.map((topic, index) => (
                  <li key={index} className='text-sm'>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className='text-sm font-semibold'>Key Mentions</h4>
              <ul className='mt-2 space-y-2'>
                {summary.key_mentions.map((mention, index) => (
                  <li
                    key={index}
                    className='flex items-center justify-between text-sm'
                  >
                    <span>{mention.entity}</span>
                    <div>
                      <Badge variant='secondary' className='mr-2'>
                        {mention.type}
                      </Badge>
                      <Badge variant='outline'>
                        {mention.mention_count} mentions
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className='text-sm font-semibold'>Relevance to Region</h4>
              <p className='mt-1 text-sm'>{summary.relevance_to_region}</p>
            </div>

            <div>
              <h4 className='text-sm font-semibold'>Actionable Insights</h4>
              <ul className='mt-2 space-y-1'>
                {summary.actionable_insights.map((insight, index) => (
                  <li key={index} className='text-sm'>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className='p-5 space-y-4 text-justify'>
      <BackBtn />
      <hr />

      <div className='grid gap-5 '>
        <div className='relative w-full max-w-lg mx-auto h-64 lg:h-[300px] '>
          <Image
            fill
            src={imgUrl || Img}
            alt='Article Img'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority
            className='rounded-xl object-cover'
          />
        </div>

        <div className='grid gap-3 lg:grid-cols-2'>
          <div className='space-y-2'>
            <h4 className='text-2xl '>Content</h4>
            <p className='text-slate-700'>{cleanText}</p>
          </div>

          <div className='space-y-2'>
            <h4 className='text-2xl '>Summary</h4>
            <div className='text-slate-900'>
              <div className='space-y-2'>
                <h5 className='text-lg'>{summary.title}</h5>
                <p>
                  <strong>Summary:</strong> {summary.summary}
                </p>
                <p>
                  <strong>Sentiment:</strong> {summary.sentiment}
                </p>
                <p>
                  <strong>Geographic Level:</strong> {summary.geographic_level}
                </p>

                <h2 className='text-base'>Topics Covered:</h2>
                <ul>
                  {summary.topics_covered.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>

                <h5 className='text-lg'>Key Mentions:</h5>
                <ul>
                  {summary.key_mentions.map((mention, index) => (
                    <li key={index}>
                      <strong>{mention.entity}</strong> ({mention.type}):
                      {mention.mention_count} mentions
                    </li>
                  ))}
                </ul>

                <p>
                  <strong>Relevance to Region:</strong>
                  {summary.relevance_to_region}
                </p>

                <h5 className='text-lg'>Actionable Insights:</h5>
                <ul>
                  {summary.actionable_insights.map((insight, index) => (
                    <li key={index}>{insight}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
