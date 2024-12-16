'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const BackBtn = () => {
  const router = useRouter();

  return <Button onClick={() => router.back()}>Go Back</Button>;
};

export default BackBtn;
