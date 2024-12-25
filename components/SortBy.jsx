'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import qs from 'query-string';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const SelectSort = ({ sortBy }) => {
  const router = useRouter();
  const [sortChange, setSortChange] = useState(sortBy || '');

  const handleSortChange = async (value) => {
    setSortChange(value);

    const existingQuery = qs.parse(window.location.search);
    const query = { ...existingQuery, sortBy: value, page: 1 };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <Select value={sortChange} onValueChange={handleSortChange}>
      <SelectTrigger
        className={cn(
          'w-[180px] capitalize focus:ring-0 ring-offset-0 focus:ring-offset-0 outline-none  hover:bg-accent ',
          !sortChange && 'text-muted-foreground'
        )}
      >
        <SelectValue placeholder='Select a sort option' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>SortBy</SelectLabel>
          <SelectItem value='relevancy'>Relevancy</SelectItem>
          <SelectItem value='popularity'>Popularity</SelectItem>
          <SelectItem value='publishedAt'>PublishedAt</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectSort;
