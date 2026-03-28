import { SidebarTrigger } from "@/components/ui/sidebar";
import { PageBreadcrumb } from "./components/page-breadcrumb";

export default function MainLayout({ params, children }: {params: any, children: React.ReactNode}) {
  return (
    <>
        <header className="flex flex-row items-center gap-4 h-16 px-4 bg-white dark:bg-black">
          <SidebarTrigger />
          <PageBreadcrumb params={params} />
        </header>

        <main className="h-full overflow-y-hidden">{children}</main>
    </>
    
  );
}
