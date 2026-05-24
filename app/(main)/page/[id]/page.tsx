import { auth } from "@/auth";
import { pageService } from "@/services/page";
import { notFound } from "next/navigation";
import PageClient from "./components/page-client";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    notFound();
  }
  
  const page = await pageService.getPage({userId: session.user.id, id: id});

  return (
    <PageClient page={page} />
  );
}
