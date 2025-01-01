import Image from 'next/image';
import { motion } from 'framer-motion';

import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';

const ScanImageContainer = ({
  imageData,
  currentImageIndex,
  progress,
  progressLabel,
  ocrResults,
}) => {
  return (
    <div className='grid gap-6 md:grid-cols-2'>
      {imageData.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className='overflow-hidden'>
            <CardContent className='p-6'>
              <div className='flex flex-col gap-4'>
                <div className='relative w-full h-64 rounded-lg overflow-hidden'>
                  <Image
                    src={image}
                    alt={`Uploaded image ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                </div>
                {currentImageIndex === index && (
                  <div className='space-y-2'>
                    <p className='text-sm font-medium'>
                      {progressLabel.toUpperCase()}
                    </p>
                    <Progress value={progress * 100} className='w-full' />
                  </div>
                )}
                <div className='flex-1'>
                  <h2 className='text-xl font-semibold mb-2 flex items-center'>
                    <ImageIcon className='w-5 h-5 mr-2' />
                    Extracted Text
                  </h2>
                  <pre className='h-40 p-4 rounded-md bg-muted whitespace-pre-wrap text-sm overflow-auto border border-border'>
                    {ocrResults[index] || 'Extracted text will appear here'}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ScanImageContainer;
