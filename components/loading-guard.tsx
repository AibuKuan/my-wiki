"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { Loader2 } from "lucide-react";

export function LoadingGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(false);
    
    return () => setIsPending(true);
  }, [pathname]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {isPending && (
        <div className="absolute inset-0 z-[99] flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] transition-all">
           {/* Darken effect + Spinner */}
           <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-200">
             <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
             <p className="text-xs font-medium text-muted-foreground">Loading Page...</p>
           </div>
        </div>
      )}
      <div className={isPending ? "pointer-events-none select-none" : ""}>
        {children}
      </div>
    </div>
  );
}