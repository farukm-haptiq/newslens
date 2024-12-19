import { getSingleArticle, getSummary } from '@/lib/actions';
import BackBtn from '@/components/BackBtn';

const ArticlePage = async ({ searchParams }) => {
  const { url } = await searchParams;
  const article = await getSingleArticle(decodeURIComponent(url));

  if (!article)
    return (
      <div className='space-y-3'>
        <h1 className='text-5xl '>
          Content not found related to your article...
        </h1>
        <BackBtn />
      </div>
    );

  const cleanText = article.textContent.trim();

  const summaryResponse = await getSummary(cleanText);

  return (
    <div className='p-5 space-y-4 text-justify'>
      <BackBtn />
      <hr />
      <p>{cleanText}</p>

      <h4>Summary</h4>
      <p>{summaryResponse.choices[0].message.content}</p>
    </div>
  );
};

export default ArticlePage;
