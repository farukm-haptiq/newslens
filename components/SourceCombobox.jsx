'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
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
import qs from 'query-string';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const FormSchema = z.object({
  source: z.string({
    required_error: 'Please select a source.',
  }),
});

const ComboboxSource = ({ newsSources, source }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { source },
  });

  function onChangeSourceHandler(source) {
    const existingQuery = qs.parse(window.location.search);
    const query = { ...existingQuery, sources: source };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  }

  return (
    <Form {...form}>
      <form className='space-y-6'>
        <FormField
          control={form.control}
          name='source'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              {/* <FormLabel>Source</FormLabel> */}
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? newsSources.find(
                            (source) => source.value === field.value
                          )?.label
                        : 'Select Source'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder='Search source...' />
                    <CommandList>
                      <CommandEmpty>No source found.</CommandEmpty>
                      <CommandGroup>
                        {newsSources.map((source) => (
                          <CommandItem
                            value={source.label}
                            key={source.value}
                            onSelect={() => {
                              form.setValue('source', source.value);
                              setPopoverOpen(false);
                              onChangeSourceHandler(source.value);
                            }}
                          >
                            {source.label}
                            <Check
                              className={cn(
                                'ml-auto',
                                source.value === field.value
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
      </form>
    </Form>
  );
};

export default ComboboxSource;
