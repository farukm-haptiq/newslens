'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FormSchema = z.object({
  search: z.string(),
  source: z.string({
    required_error: 'Please select a source.',
  }),
  sortBy: z.string(),
});

const ExploreNewsForm = ({
  initialSearch = '',
  initialSource = '',
  initialSortBy = 'relevancy',
  newsSources,
}) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: initialSearch,
      source: initialSource || newsSources[0]?.value,
      sortBy: initialSortBy,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function onSubmit(values) {
    const query = { ...values, search: values.search?.trim() };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  }

  if (!isMounted) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <FormField
            control={form.control}
            name='search'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search</FormLabel>
                <FormControl>
                  <Input type='search' placeholder='Search...' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='source'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source</FormLabel>

                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? newsSources.find((src) => src.value === field.value)
                              ?.label
                          : 'Select Source'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0'>
                    <Command>
                      <CommandInput placeholder='Search source...' />
                      <CommandList>
                        <CommandEmpty>No source found.</CommandEmpty>
                        <CommandGroup>
                          {newsSources.map((src) => (
                            <CommandItem
                              value={src.label}
                              key={src.value}
                              onSelect={() => {
                                setPopoverOpen(false);
                                form.setValue('source', src.value);
                              }}
                            >
                              {src.label}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  src.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='sortBy'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort By</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        'capitalize focus:ring-0 ring-offset-0 focus:ring-offset-0 outline-none  hover:bg-accent ',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <SelectValue placeholder='Select a sort option' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort By</SelectLabel>
                      <SelectItem value='relevancy'>Relevancy</SelectItem>
                      <SelectItem value='popularity'>Popularity</SelectItem>
                      <SelectItem value='publishedAt'>Published At</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          variant='submitBtn'
          className=' w-full transition-all duration-300 lg:w-[calc(33.33%-20px)] lg:ml-auto lg:block'
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ExploreNewsForm;
