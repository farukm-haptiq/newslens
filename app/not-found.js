import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='space-y-2'>
      <h2 className='text-5xl'>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button asChild>
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  );
}
