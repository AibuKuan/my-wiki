import { auth } from "@/auth";
import { Editor } from "@/components/dynamic-editor";
import { pageService } from "@/services/page";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    notFound();
  }
  
  const page = await pageService.getPage(session.user.id, id);

  return (
    <div className="flex flex-col p-4 h-screen">
      <div className="p-4 h-full flex-1 overflow-hidden">
        <Editor page={page} />
      </div>
    </div>
  );
}
