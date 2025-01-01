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
  Globe,
  Newspaper,
  List,
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
  FormMessage,
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
import { motion } from 'framer-motion';

import { countries, categories } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import Loader from '@/components/Loader';

const FormSchema = z.object({
  search: z
    .string()
    .min(10, { message: 'Search term must be at least 10 characters long.' }),
  source: z.string({
    required_error: 'Please select a source.',
  }),
  country: z.string().nonempty({ message: 'Please select a country.' }),
  category: z.string().nonempty({ message: 'Please select a category.' }),
});

const NewsSearchForm = ({
  initialSearch = '',
  initialSource = 'all',
  initialCountry = 'all',
  initialCategory = 'all',
  newsSources,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const [sourcePopoverOpen, setSourcePopoverOpen] = useState(false);
  const [countryPopoverOpen, setCountryPopoverOpen] = useState(false);
  const [categoryPopoverOpen, setCategoryPopoverOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: initialSearch,
      source: initialSource || newsSources[0]?.value,
      country: initialCountry || countries[0]?.value,
      category: initialCategory || categories[0]?.value,
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

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-card p-6 rounded-lg shadow-lg space-y-6'
    >
      <h2 className='text-3xl font-bold mb-6 text-center gradient-text'>
        Smart Search
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
                          placeholder='Enter your search term...'
                          {...field}
                          className='bg-background transition-all duration-300 focus:ring-2 focus:ring-primary'
                        />
                      </FormControl>
                      <FormMessage />
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
                      <Popover
                        open={sourcePopoverOpen}
                        onOpenChange={setSourcePopoverOpen}
                      >
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
                                      setSourcePopoverOpen(false);
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
                  name='country'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center text-sm font-medium'>
                        <Globe className='w-4 h-4 mr-2' />
                        Country
                      </FormLabel>
                      <Popover
                        open={countryPopoverOpen}
                        onOpenChange={setCountryPopoverOpen}
                      >
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
                                ? countries.find(
                                    (src) => src.value === field.value
                                  )?.label
                                : 'Select Country'}
                              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-full p-0'>
                          <Command>
                            <CommandInput placeholder='Search country...' />
                            <CommandList>
                              <CommandEmpty>No country found.</CommandEmpty>
                              <CommandGroup>
                                {countries.map((src) => (
                                  <CommandItem
                                    value={src.label}
                                    key={src.value}
                                    onSelect={() => {
                                      setCountryPopoverOpen(false);
                                      form.setValue('country', src.value);
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
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center text-sm font-medium'>
                        <List className='w-4 h-4 mr-2' />
                        Category
                      </FormLabel>
                      <Popover
                        open={categoryPopoverOpen}
                        onOpenChange={setCategoryPopoverOpen}
                      >
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
                                ? categories.find(
                                    (src) => src.value === field.value
                                  )?.label
                                : 'Select Category'}
                              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-full p-0'>
                          <Command>
                            <CommandInput placeholder='Search Category...' />
                            <CommandList>
                              <CommandEmpty>No category found.</CommandEmpty>
                              <CommandGroup>
                                {categories.map((src) => (
                                  <CommandItem
                                    value={src.label}
                                    key={src.value}
                                    onSelect={() => {
                                      setCategoryPopoverOpen(false);
                                      form.setValue('category', src.value);
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
              </div>

              <Button
                type='submit'
                className='md:ml-auto block w-full md:w-auto md:px-8 transition-all duration-300 text-primary-foreground font-semibold py-2 rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-1'
                effect='shineHover'
              >
                Search News
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NewsSearchForm;
