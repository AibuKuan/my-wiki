"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { useDebouncedCallback } from "use-debounce";
import { handleUpdatePage } from "@/actions/page";

import "@blocknote/shadcn/style.css";
import { useNavigationStore } from "@/app/stores/use-navigation-store";
import { useEffect } from "react";
import { EditorSkeleton } from "./editor-skeleton";

export default function Editor({ page }: { page: any }) {
  const isNavigating = useNavigationStore((state) => state.isNavigating);
  const setIsNavigating = useNavigationStore((state) => state.setIsNavigating);

  const editor = useCreateBlockNote({
    initialContent: page.content,
  });

  const onChange = useDebouncedCallback(async () => {
    handleUpdatePage({ id: page.id, content: editor.document });
  }, 1000);

  useEffect(() => {
    console.log("setting is navigating to false");
    setIsNavigating(false);
  }, [page.id, setIsNavigating]);

  if (isNavigating) {
    return <EditorSkeleton />;
  }

  return <BlockNoteView editor={editor} onChange={onChange} theme="light" />;
}
