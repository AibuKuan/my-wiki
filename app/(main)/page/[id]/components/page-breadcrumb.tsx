import { getRequiredSession } from "@/lib/auth-utils";
import { pageService } from "@/services/page";
import { PageBreadcrumbClient } from "./page-breadcrumb-client";

export async function PageBreadcrumb({ params }: { params: { id: string } }) {
  const session = await getRequiredSession();
  const { id } = await params;
  const crumbs = await pageService.getBreadcrumbs({
    pageId: id,
    userId: session.user.id,
  });
  if (!crumbs || crumbs.length === 0) return null;

  return (
    <PageBreadcrumbClient crumbs={crumbs} />
  );
}
