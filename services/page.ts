import { Page } from "@/generated/prisma/client";
import {
  PageUncheckedCreateInput,
  PageUncheckedUpdateInput,
} from "@/generated/prisma/models";
import { prisma } from "@/lib/prisma";

export type PageLightweight = Pick<Page, "id" | "title" | "parentId">;

export const pageService = {
  getAll: async ({
    userId,
    filter,
  }: {
    userId: string;
    filter?: Omit<Page, "id" | "userId" | "content">;
  }) => {
    return await prisma.page.findMany({
      where: {
        userId: userId,
        ...filter,
      },
      orderBy: {
        title: "asc",
      },
    });
  },
  getPage: async ({ userId, id }: { userId: string; id: string }) => {
    return await prisma.page.findUnique({
      where: {
        userId: userId,
        id: id,
      },
    });
  },
  createPage: async ({
    userId,
    data,
  }: {
    userId: string;
    data: Pick<PageUncheckedCreateInput, "title" | "content" | "parentId">;
  }) => {
    return await prisma.page.create({
      data: {
        userId: userId,
        ...data,
      },
    });
  },
  updatePage: async ({
    userId,
    id,
    data,
  }: {
    userId: string;
    id: string;
    data: Pick<PageUncheckedUpdateInput, "title" | "content" | "parentId">;
  }) => {
    return await prisma.page.update({
      where: {
        userId: userId,
        id: id,
      },
      data: {
        ...data,
      },
    });
  },
  deletePage: async ({ userId, id }: { userId: string; id: string }) => {
    return await prisma.page.delete({
      where: {
        userId: userId,
        id: id,
      },
    });
  },
  getBreadcrumbs: async ({
    pageId,
    userId,
  }: {
    pageId: string;
    userId: string;
  }): Promise<PageLightweight[]> => {
    const breadcrumbs: PageLightweight[] = [];
    let currentPageId: string | null = pageId;

    while (currentPageId) {
      const page: PageLightweight | null = await prisma.page.findUnique({
        where: { id: currentPageId, userId },
        select: { id: true, title: true, parentId: true }, // Light fetch
      });

      if (!page) break;

      breadcrumbs.unshift(page); // Add to the beginning of the array
      currentPageId = page.parentId;
    }

    return breadcrumbs;
  },
};
