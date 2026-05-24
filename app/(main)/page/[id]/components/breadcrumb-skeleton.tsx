import { Skeleton } from "@/components/ui/skeleton";

export function PageBreadcrumbSkeleton() {
  return (
    <div className="flex items-center gap-2 animate-in fade-in duration-200">
      {/* Root Item */}
      <Skeleton className="h-4 w-16 bg-muted/40 rounded" />
      
      {/* Separator Slash */}
      <span className="text-muted-foreground/40 text-xs select-none">/</span>
      
      {/* Mid Item / Ellipsis Mimic */}
      <Skeleton className="h-4 w-6 bg-muted/30 rounded" />
      
      {/* Separator Slash */}
      <span className="text-muted-foreground/40 text-xs select-none">/</span>
      
      {/* Active Page Item */}
      <Skeleton className="h-4 w-24 bg-muted/40 rounded" />
    </div>
  );
}