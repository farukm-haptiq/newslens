import { createWorker } from 'tesseract.js';

import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

import { Upload, FileText } from 'lucide-react';

const ScanNewsForm = ({
  imageData,
  setImageData,
  setProgress,
  setProgressLabel,
  ocrResults,
  setOcrResults,
  setCurrentImageIndex,
}) => {
  const [isReady, setIsReady] = useState(false);

  const workerRef = useRef(null);

  useEffect(() => {
    const initializeWorker = async () => {
      const worker = await createWorker({
        logger: (message) => {
          if ('progress' in message) {
            console.log({ message });
            setProgress(message.progress);
            setProgressLabel(message.status);
          }
        },
      });
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      workerRef.current = worker;
      setIsReady(true);
    };

    initializeWorker();

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const loadFile = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const fileData = [];

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          fileData.push(reader.result);
        }
        if (fileData.length === fileArray.length) {
          setImageData(fileData);
          setOcrResults(new Array(fileData.length).fill(''));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleExtract = async () => {
    if (!imageData || !workerRef.current) return;

    setProgress(0);
    setProgressLabel('Starting OCR');

    try {
      const newOcrResults = [...ocrResults];

      for (let i = 0; i < imageData.length; i++) {
        setCurrentImageIndex(i);
        setProgressLabel(`Processing image ${i + 1} of ${imageData.length}`);
        const result = await workerRef.current.recognize(imageData[i]);
        newOcrResults[i] = result.data.text;
        setOcrResults([...newOcrResults]);
      }
    } catch (error) {
      console.error('OCR Error:', error);
      setOcrResults(
        new Array(imageData.length).fill(
          'Error occurred during text extraction'
        )
      );
    } finally {
      setCurrentImageIndex(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-card p-6 rounded-lg shadow-lg max-w-4xl mx-auto space-y-6'
    >
      <h1 className='text-3xl font-bold mb-6 text-center gradient-text'>
        OCR Text Extraction
      </h1>
      <Card>
        <CardContent className='p-6'>
          <Label htmlFor='picture' className='mb-2 block text-lg font-semibold'>
            Upload Image(s)
          </Label>
          <div className='flex flex-col md:flex-row items-center gap-4'>
            <div className='relative w-full'>
              <Input
                id='picture'
                type='file'
                accept='image/*'
                multiple
                onChange={loadFile}
                className='hidden'
              />
              <Label
                htmlFor='picture'
                className='flex items-center justify-center w-full px-4 py-2 border-2 border-gray-800 rounded-lg cursor-pointer hover:border-primary transition-colors'
              >
                <Upload className='w-6 h-6 mr-2' />
                {imageData.length > 0
                  ? `${imageData.length} file${
                      imageData.length > 1 ? 's' : ''
                    } selected`
                  : 'Choose files or drag and drop'}
              </Label>
            </div>
            <Button
              disabled={!imageData.length || !isReady}
              onClick={handleExtract}
              type='submit'
              className='md:ml-auto flex px-2 w-full md:w-auto md:px-8 transition-all duration-300 text-primary-foreground font-semibold py-2 rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-1'
              effect='shineHover'
            >
              <FileText className='w-4 h-4 mr-2' />
              Extract Text
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScanNewsForm;
