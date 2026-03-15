import { auth } from "@/auth";
import { Editor } from "@/components/dynamic-editor";
import { pageService } from "@/services/page";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to perform this action." };
  }
  const { id } = await params
  const page = await pageService.getPage(session.user.id, id);

  return (
    <div className="flex flex-col p-4 h-screen">
      <div className="p-4 h-full flex-1 overflow-hidden">
        <Editor page={page} />
      </div>
    </div>
  );
}
