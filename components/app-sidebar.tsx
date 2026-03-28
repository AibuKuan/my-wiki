import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  ChevronDown,
  Plus,
  User2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/auth";
import { handleSignOut } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import NewPageDialog from "./new-page-dialog";
import { pageService } from "@/services/page";
import PageHierarchy from "./page-hierarchy";
import { buildTree } from "@/utils/page";

const projects = [
  {
    name: "Example",
    url: "/example",
    icon: Plus,
  },
  {
    name: "Workspace",
    url: "/workspace",
    icon: User2,
  },
];

const data = [
  {
    name: "Documents",
    items: [
      { name: "Resume.pdf" },
      {
        name: "Projects",
        items: [{ name: "NextJS-App.ts" }],
      },
    ],
  },
];

export async function AppSidebar() {
  const session = await auth();
  if (!session) {
    return null;
  }

  const pages = await pageService.getAll({userId: session.user?.id as string});
  const tree = buildTree(pages);
  
  // console.dir(tree, { depth: null });

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={session.user?.image ?? ""}
                      alt={session.user?.name ?? "User"}
                    />
                    <AvatarFallback className="rounded-lg">
                      {session.user?.name?.slice(0, 2).toUpperCase() || "CN"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session.user?.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {session.user?.email}
                    </span>
                  </div>

                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleSignOut}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <NewPageDialog>
            <SidebarMenuItem>
              <SidebarMenuButton>Add New Page</SidebarMenuButton>
              <SidebarMenuAction>
                <Plus className="size-4" />
              </SidebarMenuAction>
            </SidebarMenuItem>
          </NewPageDialog>

          {tree.map((item) => (
            <PageHierarchy key={item.id} item={item} />
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User2 /> Username
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}

