import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function MainLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='w-full  overflow-y-hidden'>
        <header>
          <SidebarTrigger />
        </header>

        <main className='h-full overflow-y-hidden'>{children}</main>
      </div>
    </SidebarProvider>
  );
}
