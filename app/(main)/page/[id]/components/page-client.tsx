"use client";

import { useNavigationStore } from "@/app/stores/use-navigation-store";
import { Editor } from "@/components/dynamic-editor";
import { EditorSkeleton } from "@/components/editor-skeleton";

export default function PageClient({ page }: { page: any }) {
  const isNavigating = useNavigationStore((state) => state.isNavigating);

  return (
    <div className="flex flex-col p-4 h-screen">
      <div className="p-4 h-full flex-1 overflow-hidden">
        <Editor page={page} />
      </div>
    </div>
  );
}
