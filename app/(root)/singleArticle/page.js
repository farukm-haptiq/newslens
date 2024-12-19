import { getSingleArticle, getSummary } from '@/lib/actions';
import BackBtn from '@/components/BackBtn';
import Image from 'next/image';

import Img from '@/app/assets/images/default-img.jpg';

const ArticlePage = async ({ searchParams }) => {
  const { url } = await searchParams;
  const { article, imgUrl } = await getSingleArticle(decodeURIComponent(url));

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
            <p className='text-slate-900'>
              {summaryResponse.choices[0].message.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
