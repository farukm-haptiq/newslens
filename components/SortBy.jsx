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
          'w-[180px] hover:bg-gray-100 transition-all',
          !sortChange && 'text-muted-foreground'
        )}
      >
        <SelectValue placeholder='Select a sort option' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>SortBy</SelectLabel>
          <SelectItem value='relevancy'>relevancy</SelectItem>
          <SelectItem value='popularity'>popularity</SelectItem>
          <SelectItem value='publishedAt'>publishedAt</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectSort;
