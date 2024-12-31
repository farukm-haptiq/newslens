import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarHeader from './SidebarHeader';

const SidebarLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='flex-grow w-full space-y-10'>
        <SidebarHeader />

        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
