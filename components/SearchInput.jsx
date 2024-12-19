'use client';

import { useEffect, useState } from 'react';
import qs from 'query-string';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';

const SearchInput = ({ searchText }) => {
  const router = useRouter();
  const [search, setSearch] = useState(searchText || '');
  const [isMounted, setIsMounted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const existingQuery = qs.parse(window.location.search);
    const query = { ...existingQuery, search, page: 1 };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex w-full max-w-sm items-center space-x-2'>
        <Input
          type='search'
          name='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border'
        />
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  );
};

export default SearchInput;
