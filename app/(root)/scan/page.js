'use client';

import Heading from '@/components/Header';
import { FileScanIcon, Loader2 } from 'lucide-react';
import ScanNewsForm from './components/ScanNewsForm';
import { useState } from 'react';
import NewsSearchSummary from '@/components/NewsSearchSummary';
import { getNewsSearchArticlesSummary } from '@/lib/actions';
import ScanImageContainer from './components/ScanImageContainer';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';

const ScanPage = () => {
  const [imageData, setImageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('idle');
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [ocrResults, setOcrResults] = useState([]);

  const handleSummaryClick = async () => {
    setIsLoading(true);
    try {
      const data = await getNewsSearchArticlesSummary(ocrResults, true);
      setSummary(data);
    } catch (error) {
      console.error('GET SCAN IMAGE SUMMARY ERROR', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-10'>
      <Heading
        title='Scan Print Media'
        description='Turn images into insights instantly.'
        icon={FileScanIcon}
        iconColor='text-orange-700'
        bgColor='bg-orange-700/10'
      />

      <ScanNewsForm
        imageData={imageData}
        setImageData={setImageData}
        setProgress={setProgress}
        setProgressLabel={setProgressLabel}
        ocrResults={ocrResults}
        setOcrResults={setOcrResults}
        setCurrentImageIndex={setCurrentImageIndex}
      />

      <ScanImageContainer
        imageData={imageData}
        currentImageIndex={currentImageIndex}
        progress={progress}
        progressLabel={progressLabel}
        ocrResults={ocrResults}
      />

      {ocrResults.some((result) => result !== '') && (
        <Button
          onClick={handleSummaryClick}
          className='w-full md:w-auto md:px-8 transition-all duration-300 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold py-2 rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-1'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Getting summary...
            </>
          ) : (
            'Get Summary'
          )}
        </Button>
      )}

      {isLoading && <Loader />}

      {summary && <NewsSearchSummary {...summary} />}
    </div>
  );
};

export default ScanPage;
