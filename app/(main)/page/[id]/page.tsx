import { Editor } from "@/components/dynamic-editor";
import { pageService } from "@/services/page";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params
  const page = await pageService.getPage(id);

  return (
    <div className="flex flex-col p-4 h-screen">
      <div className="p-4 h-full flex-1 overflow-hidden">
        <Editor page={page} />
      </div>
    </div>
  );
}
