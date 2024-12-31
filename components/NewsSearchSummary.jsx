import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const NewsSearchSummary = ({
  title,
  summaries,
  sentiment,
  topics_covered,
  key_mentions,
  relevance_to_region,
  actionable_insights,
}) => {
  const sentimentColor =
    {
      positive: 'bg-green-100 text-green-800',
      neutral: 'bg-gray-100 text-gray-800',
      negative: 'bg-red-100 text-red-800',
    }[sentiment] || 'bg-gray-100 text-gray-800';

  return (
    <div className='container mx-auto space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>{title}</CardTitle>
          <CardDescription className='flex items-center space-x-2'>
            <span>Sentiment:</span>
            <Badge
              variant='secondary'
              className={`${sentimentColor} capitalize`}
            >
              {sentiment}
            </Badge>
            <span className='ml-4'>Relevance to region:</span>
            <Badge variant='outline' className='capitalize'>
              {relevance_to_region}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <h3 className='text-lg font-semibold mb-2'>Topics Covered</h3>
              <div className='flex flex-wrap gap-2'>
                {topics_covered?.map((topic, index) => (
                  <Badge key={index} variant='secondary'>
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='summaries'>
                <AccordionTrigger>Summaries</AccordionTrigger>
                <AccordionContent>
                  <div className='space-y-4'>
                    {summaries.map((summary, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className='text-lg capitalize'>
                            {summary.level} Level
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{summary.summary}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='key-mentions'>
                <AccordionTrigger>Key Mentions</AccordionTrigger>
                <AccordionContent>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {key_mentions?.map((mention, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className='text-lg'>
                            {mention.entity}
                          </CardTitle>
                          <CardDescription className='capitalize'>
                            {mention.type}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Mentioned {mention.mention_count} times</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value='actionable-insights'>
                <AccordionTrigger>Actionable Insights</AccordionTrigger>
                <AccordionContent>
                  <ul className='list-disc pl-5 space-y-2'>
                    {actionable_insights.map((insight, index) => (
                      <li key={index}>{insight}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsSearchSummary;
