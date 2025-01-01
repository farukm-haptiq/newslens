import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import BackBtn from '@/components/BackBtn';
import SingleArticleSummary from './components/SingleArticleSummary';
import SingleArticleSummaryImage from './components/SingleArticleSummaryImage';

import { getSingleArticle, getSingleArticleSummary } from '@/lib/actions';

const SingleArticlePage = async ({ searchParams }) => {
  const { url } = await searchParams;
  const { article } = await getSingleArticle(decodeURIComponent(url));

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

  const summary = await getSingleArticleSummary(cleanText);

  if (!summary) {
    return (
      <div className='space-y-3'>
        <h1 className='text-5xl '>Fail to get summary of your article...</h1>
        <BackBtn />
      </div>
    );
  }

  return (
    <div className='space-y-6 text-justify'>
      <BackBtn />
      <Separator />

      <div>
        <SingleArticleSummaryImage img={article.imgUrl} />

        <div className='grid gap-8 md:grid-cols-2 items-start mt-10'>
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>{cleanText}</p>
            </CardContent>
          </Card>

          <SingleArticleSummary summary={summary} />
        </div>
      </div>
    </div>
  );
};

export default SingleArticlePage;
