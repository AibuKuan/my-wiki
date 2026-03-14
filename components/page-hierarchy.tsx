"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight, Folder, Plus, File, Pencil } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { TooltipTrigger, TooltipContent, Tooltip } from "./ui/tooltip";
import { handleCreatePage } from "@/actions/page";
import NewPageDialog from "./new-page-dialog";

export default function PageHierarchy({ item }: { item: any }) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(item.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenaming) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isRenaming]);

  const handleRename = () => {
    // TODO: persist rename
    setIsRenaming(false);
  };

  const handleAddPage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: trigger add page under item.id
  };

  const handleRenameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRenaming(true);
  };

  const actions = (
    <div className="ml-auto flex items-center gap-0.5 opacity-0 group-hover/nav-item:opacity-100 transition-opacity">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleRenameClick}
            className="p-0.5 rounded hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-sidebar-foreground"
          >
            <Pencil className="size-3" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">Rename</TooltipContent>
      </Tooltip>

      <NewPageDialog parent={item}>
        <button
          // onClick={() => console.log('im clicking instead')}
          className="p-0.5 rounded hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-sidebar-foreground"
        >
          <Plus className="size-3" />
        </button>
      </NewPageDialog>
    </div>
  );

  const titleContent = isRenaming ? (
    <input
      ref={inputRef}
      value={renameValue}
      onChange={(e) => setRenameValue(e.target.value)}
      onBlur={handleRename}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleRename();
        if (e.key === "Escape") {
          setRenameValue(item.title);
          setIsRenaming(false);
        }
      }}
      onClick={(e) => e.preventDefault()}
      className="bg-transparent outline outline-1 outline-sidebar-ring rounded px-1 w-full text-sm"
    />
  ) : (
    <span>{renameValue}</span>
  );

  // Base case: leaf node (no children)
  if (!item.children || item.children.length === 0) {
    return (
      <SidebarMenuSubItem className="group/nav-item">
        <SidebarMenuSubButton asChild>
          <div className="flex items-center w-full pr-2 hover:bg-sidebar-accent rounded-md"> {/*<--- stack trace is here'*/}
            <Link href={`/page/${item.id}`} className="flex items-center gap-2 flex-1 p-2">
              <File className="size-4 shrink-0" />
              {titleContent}
            </Link>
            {!isRenaming && actions}
          </div>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  }

  // Recursive case: folder with children
  return (
    <SidebarMenuItem className="group/nav-item">
      <Collapsible className="group/collapsible">
        <div className="flex items-center">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="flex-1" asChild>
              <div className="flex items-center w-full pr-2 hover:bg-sidebar-accent rounded-md">
                <Link
                  href={`/page/${item.id}`}
                  className="flex items-center gap-2 flex-1 p-2"
                >
                  <Folder className="size-4 shrink-0" />
                  {titleContent}
                </Link>
                {!isRenaming && actions}
                <ChevronRight className="size-4 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </div>
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map((subItem: any) => (
              <PageHierarchy key={subItem.id} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
