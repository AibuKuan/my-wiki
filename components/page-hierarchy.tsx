"use client";

import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  ChevronRight,
  Folder,
  Plus,
  File,
  Pencil,
  MoreHorizontal,
  ChevronDown,
  Trash2Icon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { TooltipTrigger, TooltipContent, Tooltip } from "./ui/tooltip";
import { handleCreatePage, handleDeletePage, handleUpdatePage } from "@/actions/page";
import NewPageDialog from "./new-page-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

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
    handleUpdatePage({id: item.id, title: renameValue});
    setIsRenaming(false);
  };

  const handleRenameClick = () => {
    setIsRenaming(true);
  };

  const handleDeleteClick = async () => {
    await handleDeletePage(item.id);
  };

  const actions = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right" align="start">
        <DropdownMenuItem onSelect={handleRenameClick}>
          <Pencil className="size-3 mr-2" />
          Rename
        </DropdownMenuItem>

        <NewPageDialog parent={item}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Plus className="size-3 mr-2" />
            Add page
          </DropdownMenuItem>
        </NewPageDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash2Icon className="size-3 mr-2" />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>

          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <Trash2Icon />
              </AlertDialogMedia>
              <AlertDialogTitle>Delete page?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this page. Are you sure?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={handleDeleteClick}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
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
      className="bg-transparent outline outline-1 outline-sidebar-ring rounded px-1 w-full text-sm truncate min-w-0"
    />
  ) : (
    <span className="truncate min-w-0">{renameValue}</span>
  );

  const isLeaf = !item.children || item.children.length === 0;

  return (
    <SidebarMenuItem className="group/nav-item">
      <Collapsible className={`group/collapsible`} disabled={isLeaf}>
        <div className="flex items-center">
          <SidebarMenuButton className="flex-1" asChild>
            <div className="flex items-center w-full pr-2 hover:bg-sidebar-accent rounded-md">
              {!isLeaf && (
                <CollapsibleTrigger asChild>
                  <button type="button" className="p-1">
                    <ChevronDown
                      className={`size-4 shrink-0 transition-transform -rotate-90 [[data-state=open]>&]:rotate-0`}
                    />
                  </button>
                </CollapsibleTrigger>
              )}

              <Link
                href={`/page/${item.id}`}
                className="flex items-center gap-2 flex-1 p-2 min-w-0"
              >
                <File className="size-4 shrink-0" />
                {titleContent}
              </Link>
            </div>
          </SidebarMenuButton>

          <SidebarMenuAction>{!isRenaming && actions}</SidebarMenuAction>
        </div>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children?.map((subItem: any) => (
              <PageHierarchy key={subItem.id} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
