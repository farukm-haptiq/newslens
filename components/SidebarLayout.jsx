import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarHeader from './SidebarHeader';

const SidebarLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='flex-grow w-full'>
        <SidebarHeader />

        <main className='container mx-auto bg-background px-10 pb-10'>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
