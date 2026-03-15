"use server";

import { auth } from "@/auth";
import { pageService } from "@/services/page";
import { revalidatePath } from "next/cache";

export async function handleCreatePage(prevState: any, formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "You must be logged in to perform this action." };
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const parentRaw = formData.get("parent") as string ?? null;
    const parentId = parentRaw === "" ? null : parentRaw;
    console.log("information: ", title, content, parentId);

    if (!title || title.length < 3) {
      return { error: "Title must be at least 3 characters long." };
    }

    const res = await pageService.createPage(
      session.user.id,
      title,
      content,
      parentId,
    );

    revalidatePath("/sidebar");
    return { success: true, data: res };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to create page. Please try again." };
  }
}

export async function handleUpdatePage({
  id,
  title,
  content,
}: {
  id: string;
  title?: string;
  content?: object;
}) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "You must be logged in to perform this action." };
    }

    const res = await pageService.updatePage({
      userId: session.user.id,
      id: id,
      title: title,
      content: content,
    });

    revalidatePath("/sidebar");
    return { success: true, data: res };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to update page. Please try again." };
  }
}

export async function handleDeletePage(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "You must be logged in to perform this action." };
    }
    const res = await pageService.deletePage(session.user.id, id);

    revalidatePath("/sidebar");
    return { success: true, data: res };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to delete page. Please try again." };
  }
}
