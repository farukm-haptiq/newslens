import SearchInput from '@/components/SearchInput';
import ComboboxSource from '@/components/SourceCombobox';
import SelectSort from '@/components/SortBy';
import axios from 'axios';
import Link from 'next/link';
import qs from 'query-string';
import SingleArticleBtn from '@/components/SingleArticleBtn';
import Image from 'next/image';
import Img from '../assets/images/default-img.jpg';

const HomePage = async ({ searchParams }) => {
  const query = await searchParams;
  const searchQuery = query.search || 'india';
  const sources = query.sources;
  const sortBy = query.sortBy;

  const queryParams = qs.stringify(
    {
      q: searchQuery,
      sortBy: sortBy || undefined,
      sources: sources || undefined,
      apiKey: process.env.NEWS_API_KEY,
    },
    { skipNull: true, skipEmptyString: true }
  );

  const newsUrl = `https://newsapi.org/v2/everything?${queryParams}`;
  const response = await axios(newsUrl);

  let newsSources = await axios('https://newsapi.org/v1/sources');
  newsSources = newsSources.data.sources
    .filter((source) => source.language == 'en')
    .map((source) => ({ label: source.name, value: source.id }));

  const articles = response.data.articles;

  return (
    <div className=' p-10 space-y-5'>
      <h1 className='text-7xl font-extrabold'>Newslens</h1>
      <p>– A sharper perspective on the news.</p>
      <SearchInput searchText={searchQuery} />
      <ComboboxSource newsSources={newsSources} source={sources} />
      <SelectSort sortBy={sortBy} />

      <div className=' grid gap-5 md:grid-cols-2 lg:grid-cols-4'>
        {articles.map((article, index) => {
          return (
            <div
              key={index}
              className='bg-gray-200 px-4 space-y-2 py-2 rounded-md shadow-md  transition hover:shadow-lg'
            >
              <div className='relative w-full h-64'>
                <Image
                  fill
                  src={article.urlToImage || Img}
                  alt='Article Img'
                  className='rounded-xl object-cover'
                />
              </div>
              <h5 className='text-xl text-slate-900'>
                published by:{' '}
                <span className='font-bold text-red-500'>{article.author}</span>
              </h5>
              <h6 className='text-slate-700'>source: {article.source?.name}</h6>
              <p>{article.description}</p>

              <SingleArticleBtn url={article.url} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
