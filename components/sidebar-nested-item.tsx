"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, File, Pencil, Plus, Trash2Icon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import NewPageDialog from "./new-page-dialog";
import {
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { handleUpdatePage, handleDeletePage } from "@/actions/page";

export default function PageHierarchy({ item, depth = 0 }: { item: any; depth?: number }) {
  const pathname = usePathname();
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(item.title);
  const isLeaf = !item.children || item.children.length === 0;

  const isActive = pathname === `/page/${item.id}`;

  const handleCommitRename = () => {
    handleUpdatePage({ id: item.id, title: renameValue });
    setIsRenaming(false);
  };

  return (
    <Collapsible className="group/collapsible w-full" disabled={isLeaf}>
      <div
        className={cn(
          "flex items-center w-full hover:bg-sidebar-accent rounded-md pr-2 transition-colors group/nav-item",
          isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
        )}
        style={{ paddingLeft: `${depth * 1}rem` }}
      >
        <div className="flex size-6 items-center justify-center shrink-0">
          {!isLeaf && (
            <CollapsibleTrigger asChild>
              <button className="p-1 hover:bg-sidebar-accent-foreground/10 rounded-sm">
                {/* Fixed the rotate logic for standard Lucide Chevron */}
                <ChevronRight className="size-3 transition-transform [[data-state=open]>&]:rotate-90" />
              </button>
            </CollapsibleTrigger>
          )}
        </div>

        <Link
          href={`/page/${item.id}`}
          className="flex items-center gap-2 flex-1 py-1.5 min-w-0"
        >
          <File className="size-4 shrink-0 text-muted-foreground" />
          <PageTitle
            isRenaming={isRenaming}
            value={renameValue}
            onChange={setRenameValue}
            onCommit={handleCommitRename}
            onCancel={() => {
              setRenameValue(item.title);
              setIsRenaming(false);
            }}
          />
        </Link>

        {!isRenaming && (
          <PageActions
            item={item}
            onRename={() => setIsRenaming(true)}
            onDelete={handleDeletePage}
          />
        )}
      </div>

      <CollapsibleContent className="w-full">
        <div className="flex flex-col w-full">
          {item.children?.map((subItem: any) => (
            <PageHierarchy
              key={subItem.id}
              item={subItem}
              depth={depth + 1}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

interface PageActionsProps {
  item: any;
  onRename: () => void;
  onDelete: (id: string) => void;
}

function PageActions({ item, onRename, onDelete }: PageActionsProps) {
  return (
    <div className="flex items-center gap-0.5 opacity-0 group-hover/nav-item:opacity-100 transition-opacity ml-auto sticky right-2 group-hover/nav-item:bg-sidebar-accent pl-2">
      <Button variant="ghost" size="icon" className="size-6" onClick={onRename}>
        <Pencil className="size-3" />
      </Button>

      <NewPageDialog parent={item}>
        <Button variant="ghost" size="icon" className="size-6">
          <Plus className="size-3" />
        </Button>
      </NewPageDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 text-destructive hover:text-destructive"
          >
            <Trash2Icon className="size-3" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete page?</AlertDialogTitle>
            <AlertDialogDescription>
              This is permanent. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface PageTitleProps {
  isRenaming: boolean;
  value: string;
  onChange: (val: string) => void;
  onCommit: () => void;
  onCancel: () => void;
}

function PageTitle({
  isRenaming,
  value,
  onChange,
  onCommit,
  onCancel,
}: PageTitleProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenaming) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isRenaming]);

  if (isRenaming) {
    return (
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onCommit}
        onKeyDown={(e) => {
          if (e.key === "Enter") onCommit();
          if (e.key === "Escape") onCancel();
        }}
        className="bg-transparent outline outline-1 outline-sidebar-ring rounded px-1 w-full text-sm min-w-0"
      />
    );
  }

  return <span className="truncate text-sm">{value}</span>;
}
