// components/ui/editor-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function EditorSkeleton() {
  return (
    <div className="flex flex-col p-4 h-screen animate-in fade-in duration-300 pointer-events-none select-none">
      <div className="p-4 h-full flex-1 overflow-hidden">
        <div className="max-w-[750px] mx-auto space-y-8 pt-10">
          
          {/* Page Title Section */}
          <div className="space-y-3">
            <Skeleton className="h-12 w-[65%] rounded-lg bg-muted/40" />
            <div className="flex items-center gap-2 pt-1">
              <Skeleton className="h-4 w-20 rounded bg-muted/30" />
              <Skeleton className="h-4 w-4 rounded-full bg-muted/30" />
              <Skeleton className="h-4 w-32 rounded bg-muted/30" />
            </div>
          </div>

          <hr className="border-muted/20 my-6" />

          {/* BlockNote Content Blocks Simulation */}
          <div className="space-y-6">
            
            {/* Block 1: Large Heading + Text */}
            <div className="space-y-3">
              <Skeleton className="h-7 w-[30%] rounded bg-muted/40" />
              <Skeleton className="h-4 w-full rounded bg-muted/30" />
              <Skeleton className="h-4 w-[92%] rounded bg-muted/30" />
              <Skeleton className="h-4 w-[85%] rounded bg-muted/30" />
            </div>

            {/* Block 2: Sub-heading + List Items */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-6 w-[20%] rounded bg-muted/40" />
              <div className="flex items-center gap-3 pl-4">
                <Skeleton className="h-4 w-4 rounded-full bg-muted/30 shrink-0" />
                <Skeleton className="h-4 w-[60%] rounded bg-muted/30" />
              </div>
              <div className="flex items-center gap-3 pl-4">
                <Skeleton className="h-4 w-4 rounded-full bg-muted/30 shrink-0" />
                <Skeleton className="h-4 w-[75%] rounded bg-muted/30" />
              </div>
            </div>

            {/* Block 3: Empty space block followed by final text */}
            <div className="space-y-3 pt-4">
              <Skeleton className="h-4 w-[95%] rounded bg-muted/30" />
              <Skeleton className="h-4 w-[40%] rounded bg-muted/30" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}