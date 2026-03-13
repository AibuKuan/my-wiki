import { Editor } from "@/components/dynamic-editor";

export default function Page() {
  return (
    <div className="flex flex-col p-4 h-screen">
      <div className="p-4 h-full flex-1 overflow-hidden">
        <Editor />
      </div>
    </div>
  );
}
