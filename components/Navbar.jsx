import React from 'react';
import { SidebarTrigger } from './ui/sidebar';
import { Separator } from './ui/separator';
import ModeToggle from './ModeToggle';

const Navbar = () => {
  return (
    <header className='sticky top-0 z-10 left-0 right-0 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 backdrop-blur-sm '>
      <div className='flex items-center gap-2 px-4 w-full'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />

        <div className='flex justify-between w-full'>
          <h4 className='text-2xl font-extrabold'>
            <span className='gradient-text'>Newslens</span>
          </h4>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
