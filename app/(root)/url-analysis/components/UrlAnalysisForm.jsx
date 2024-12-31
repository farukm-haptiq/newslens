'use client';

import { PlusIcon, TrashIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const UrlAnalysisForm = ({
  urls,
  setUrls,
  errors,
  setErrors,
  handleSubmit,
}) => {
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

  return (
    <div className='grid gap-2'>
      <form className='space-y-3' onSubmit={handleSubmit}>
        <div className='space-y-1'>
          <Label>Urls</Label>
          <div className='grid gap-4'>
            {urls.map((value, index) => (
              <div key={index} className='flex flex-col gap-y-2'>
                <div className='flex gap-x-4'>
                  <Input
                    placeholder={`News URL ${index + 1}`}
                    value={value || ''}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    className={errors[index] ? 'border-red-500' : ''}
                  />
                  <Button
                    type='button'
                    size='icon'
                    variant='outline'
                    onClick={() => handleUrlRemove(index)}
                    disabled={urls.length === 1}
                  >
                    <TrashIcon className='h-4 w-4' />
                    <span className='sr-only'>Remove Url</span>
                  </Button>
                </div>
                {errors[index] && (
                  <p className='text-red-500 text-sm'>{errors[index]}</p>
                )}
              </div>
            ))}

            <Button
              type='button'
              size='icon'
              variant='outline'
              onClick={handleAddUrls}
              disabled={urls.length >= 5}
            >
              <PlusIcon className='h-4 w-4' />
              <span className='sr-only'>Add Url</span>
            </Button>
          </div>
        </div>

        <Button
          type='submit'
          variant='submitBtn'
          className='w-full transition-all duration-300 md:w-[calc(25%)] md:ml-auto md:block'
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UrlAnalysisForm;
