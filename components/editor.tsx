"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

export default function Editor() {
  const editor = useCreateBlockNote({
  });

  const onChange = async () => {
    const jsonBlocks = editor.document;
    console.log("Content changed:",jsonBlocks);
  }

  return <BlockNoteView 
    editor={editor} 
    onChange={onChange}  
  />;
}