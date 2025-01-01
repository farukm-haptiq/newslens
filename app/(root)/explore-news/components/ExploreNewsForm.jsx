'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Check,
  ChevronsUpDown,
  Search,
  SortAsc,
  Newspaper,
} from 'lucide-react';
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
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-card p-6 rounded-lg shadow-lg space-y-6'
    >
      <h2 className='text-3xl font-bold mb-6 text-center gradient-text'>
        Explore News
      </h2>

      <Card>
        <CardContent className='p-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <FormField
                  control={form.control}
                  name='search'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center text-sm font-medium'>
                        <Search className='w-4 h-4 mr-2' />
                        Search
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='search'
                          placeholder='Search...'
                          {...field}
                          className='bg-background transition-all duration-300 focus:ring-2 focus:ring-primary'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='source'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center text-sm font-medium'>
                        <Newspaper className='w-4 h-4 mr-2' />
                        Source
                      </FormLabel>

                      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-full justify-between bg-background transition-all duration-300 focus:ring-2 focus:ring-primary',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? newsSources.find(
                                    (src) => src.value === field.value
                                  )?.label
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
                      <FormLabel className='flex items-center text-sm font-medium'>
                        <SortAsc className='w-4 h-4 mr-2' />
                        Sort By
                      </FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {/* <Button
                      variant='outline'
                      className={cn(
                        'w-full justify-between bg-background transition-all duration-300 focus:ring-2 focus:ring-primary',
                        !field.value && 'text-muted-foreground'
                      )}
                    > */}
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              'capitalize bg-background transition-all duration-300 focus:ring-0 ring-offset-0 focus:ring-offset-0 outline-none  hover:bg-accent ',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <SelectValue placeholder='Select a sort option' />
                          </SelectTrigger>
                        </FormControl>
                        {/* </Button> */}
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Sort By</SelectLabel>
                            <SelectItem value='relevancy'>Relevancy</SelectItem>
                            <SelectItem value='popularity'>
                              Popularity
                            </SelectItem>
                            <SelectItem value='publishedAt'>
                              Published At
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type='submit'
                className='md:ml-auto block w-full md:w-auto md:px-8 transition-all duration-300 text-primary-foreground font-semibold py-2 rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-1'
                effect='shineHover'
              >
                Explore News
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExploreNewsForm;
