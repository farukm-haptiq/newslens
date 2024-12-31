import { Link } from 'lucide-react';

import Heading from '@/components/Header';
import UrlAnalysisWrapper from './components/UrlAnalysisWrapper';

const UrlAnalysisPage = () => {
  return (
    <div className='bg-background px-10 space-y-5'>
      <Heading
        title='Search News'
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
