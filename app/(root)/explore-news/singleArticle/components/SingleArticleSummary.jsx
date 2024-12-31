import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SingleArticleSummary = ({ summary }) => {
  return (
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
  );
};

export default SingleArticleSummary;
