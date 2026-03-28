import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full  overflow-y-hidden">{children}</div>
    </SidebarProvider>
  );
}
