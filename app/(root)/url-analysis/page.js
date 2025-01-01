import { Link } from 'lucide-react';

import Heading from '@/components/Header';
import UrlAnalysisWrapper from './components/UrlAnalysisWrapper';

const UrlAnalysisPage = () => {
  return (
    <div className='space-y-10'>
      <Heading
        title='Analyze URL'
        description='Summarize multiple links in one go.'
        icon={Link}
        iconColor='text-emerald-500'
        bgColor='bg-emerald-500/10'
      />

      <UrlAnalysisWrapper />
    </div>
  );
};

export default UrlAnalysisPage;
