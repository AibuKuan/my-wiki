"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { useDebouncedCallback } from "use-debounce";
import { handleUpdatePage } from "@/actions/page";

import "@blocknote/shadcn/style.css";

export default function Editor({ page }: { page: any }) {
  const editor = useCreateBlockNote({
    initialContent: page.content
  });

  const onChange = useDebouncedCallback(async () => {
    handleUpdatePage({ id: page.id, content: editor.document });
  }, 1000);

  return <BlockNoteView
    editor={editor}
    onChange={onChange}
    theme="light"
  />;
}