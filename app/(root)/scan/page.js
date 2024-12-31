import Heading from '@/components/Header';
import { FileScanIcon } from 'lucide-react';

const ScanPage = () => {
  return (
    <div className='bg-background px-10 space-y-5'>
      <Heading
        title='Scan News'
        description='Turn images into insights instantly.'
        icon={FileScanIcon}
        iconColor='text-orange-700'
        bgColor='bg-orange-700/10'
      />
      hello
    </div>
  );
};

// Turn images into insights instantly.

export default ScanPage;
