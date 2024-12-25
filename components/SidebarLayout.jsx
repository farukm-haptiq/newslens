import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from './Navbar';

const SidebarLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='flex-grow w-full'>
        <Navbar />

        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
