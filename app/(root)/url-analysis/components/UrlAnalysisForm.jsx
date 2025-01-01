'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, Link, Loader2 } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

const UrlAnalysisForm = ({
  urls,
  setUrls,
  errors,
  setErrors,
  handleSubmit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddUrls = () => {
    setUrls([...urls, '']);
    setErrors([...errors, '']);
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);

    const newErrors = [...errors];
    newErrors[index] = '';
    setErrors(newErrors);
  };

  const handleUrlRemove = (index) => {
    const newUrls = urls.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setUrls(newUrls);
    setErrors(newErrors);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await handleSubmit(e);
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-card p-6 rounded-lg shadow-lg max-w-4xl mx-auto'
    >
      <h2 className='text-3xl font-bold mb-6 text-center gradient-text'>
        URL Analysis
      </h2>
      <Card>
        <CardContent className='p-6'>
          <form className='space-y-6' onSubmit={onSubmit}>
            <div className='space-y-4'>
              <Label className='text-lg font-semibold flex items-center'>
                URLs to Analyze
              </Label>
              <div className='space-y-4'>
                {urls.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className='flex flex-col gap-y-2'
                  >
                    <div className='flex gap-x-4'>
                      <Input
                        placeholder={`News URL ${index + 1}`}
                        value={value || ''}
                        onChange={(e) => handleUrlChange(index, e.target.value)}
                        className={`bg-background transition-all duration-300 focus:ring-2 focus:ring-primary ${
                          errors[index] ? 'border-red-500' : ''
                        }`}
                      />
                      <Button
                        type='button'
                        size='icon'
                        variant='outline'
                        onClick={() => handleUrlRemove(index)}
                        disabled={urls.length === 1}
                        className='hover:bg-destructive hover:text-destructive-foreground transition-colors duration-300'
                      >
                        <TrashIcon className='h-4 w-4' />
                        <span className='sr-only'>Remove URL</span>
                      </Button>
                    </div>
                    {errors[index] && (
                      <p className='text-red-500 text-sm'>{errors[index]}</p>
                    )}
                  </motion.div>
                ))}

                <Button
                  type='button'
                  size='sm'
                  variant='outline'
                  onClick={handleAddUrls}
                  disabled={urls.length >= 5}
                  className='justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300'
                >
                  <PlusIcon className='h-4 w-4 mr-2' />
                  Add URL
                </Button>
              </div>
            </div>

            <Button
              type='submit'
              className='md:ml-auto block w-full md:w-auto md:px-8 transition-all duration-300 text-primary-foreground font-semibold py-2 rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-1'
              effect='shineHover'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className='flex gap-2'>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Analyzing...
                </div>
              ) : (
                'Analyze URLs'
              )}
            </Button>

            {/* <Button
              type='submit'
              className='md:ml-auto block w-full md:w-auto md:px-8 transition-all duration-300 text-primary-foreground font-semibold py-2 rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-1'
              effect='shineHover'
            >
              Explore News
            </Button> */}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UrlAnalysisForm;
