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
    const parentId = formData.get("parent") as string;
    console.log('information: ', title, content, parentId);

    if (!title || title.length < 3) {
      return { error: "Title must be at least 3 characters long." };
    }

    const res = await pageService.createPage(session.user.id, title, content, parentId);

    revalidatePath("/sidebar");
    return { success: true, data: res };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to create page. Please try again." };
  }
}

export async function handleUpdatePage(id: string, content?: object) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "You must be logged in to perform this action." };
    }

    const res = await pageService.updatePage({id: id, content: content});

    revalidatePath("/sidebar");
    return { success: true, data: res };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to update page. Please try again." };
  }
}