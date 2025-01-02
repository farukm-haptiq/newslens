'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Dock,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Newspaper,
  FileScanIcon,
  Link as LinkIcon,
  NewspaperIcon,
  ListPlus,
  FilePlus2,
  Search,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';

import logo from '@/app/assets/images/logo.png';
import logo2 from '@/app/assets/images/logo2.png';
import Link from 'next/link';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Home',
      url: '/',
      icon: Dock,
      isActive: true,
      color: 'text-sky-500',
    },
    {
      title: 'Explore News',
      url: '/explore-news',
      icon: FilePlus2,
      color: 'text-violet-500',
    },
    {
      title: 'Smart Search',
      url: '/smart-search',
      icon: Search,
      color: 'text-pink-500',
    },
    {
      title: 'Scan Print Media',
      url: '/scan',
      icon: FileScanIcon,
      color: 'text-orange-700',
    },
    {
      title: 'Analyze URL',
      url: '/url-analysis',
      icon: LinkIcon,
      color: 'text-emerald-500',
    },

    // {
    //   title: 'Documentation',
    //   url: '#',
    //   icon: BookOpen,
    //   items: []
    // },
    // {
    //   title: 'Settings',
    //   url: '#',
    //   icon: Settings2,
    //   items: []
    // },
  ],
  // navMain: [
  //   {
  //     title: 'Playground',
  //     url: '#',
  //     icon: SquareTerminal,
  //     isActive: true,
  //     items: [
  //       {
  //         title: 'History',
  //         url: '#',
  //       },
  //       {
  //         title: 'Starred',
  //         url: '#',
  //       },
  //       {
  //         title: 'Settings',
  //         url: '#',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Models',
  //     url: '#',
  //     icon: Bot,
  //     items: [
  //       {
  //         title: 'Genesis',
  //         url: '#',
  //       },
  //       {
  //         title: 'Explorer',
  //         url: '#',
  //       },
  //       {
  //         title: 'Quantum',
  //         url: '#',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Documentation',
  //     url: '#',
  //     icon: BookOpen,
  //     items: [
  //       {
  //         title: 'Introduction',
  //         url: '#',
  //       },
  //       {
  //         title: 'Get Started',
  //         url: '#',
  //       },
  //       {
  //         title: 'Tutorials',
  //         url: '#',
  //       },
  //       {
  //         title: 'Changelog',
  //         url: '#',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Settings',
  //     url: '#',
  //     icon: Settings2,
  //     items: [
  //       {
  //         title: 'General',
  //         url: '#',
  //       },
  //       {
  //         title: 'Team',
  //         url: '#',
  //       },
  //       {
  //         title: 'Billing',
  //         url: '#',
  //       },
  //       {
  //         title: 'Limits',
  //         url: '#',
  //       },
  //     ],
  //   },
  // ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { state } = useSidebar();
  const isOpen = state === 'expanded';
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        {isOpen ? (
          <Link href='/' className='flex justify-center items-center my-5'>
            <div className='relative w-12 h-12 rounded-md overflow-hidden'>
              <Image
                fill
                src={logo2}
                alt='logo-img'
                className=' object-cover'
              />
            </div>
            <h5 className='gradient-text text-3xl font-extrabold my-4 px-2'>
              NewsLens
            </h5>
          </Link>
        ) : (
          <div className='relative w-8 h-8 rounded-md overflow-hidden'>
            <Link href={'/'}>
              <Image fill src={logo} alt='logo-img' className=' object-cover' />
            </Link>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
