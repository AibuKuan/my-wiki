import { prisma } from "@/lib/prisma";
import { cleanJson } from "@/utils/prisma";

export const pageService = {
  getPages: async (userId: string) => {
    return await prisma.page.findMany({
      where: {
        userId: userId,
        // parentId: null,
      },
      include: {
        // children: {
        //   // You can also sort the children inside the include!
        //   orderBy: {
        //     title: "asc",
        //   },
        // },
        // parent: true,
      },
      orderBy: {
        title: "asc", // Sorts the main list of pages
      },
    });
  },
  getPage: async (userId: string, id: string) => {
    return await prisma.page.findUnique({
      where: {
        userId: userId,
        id: id,
      },
      include: {
        children: true,
        parent: true,
      },
    });
  },
  createPage: async (
    userId: string,
    title: string,
    content: string,
    parentId?: string | null,
  ) => {
    return await prisma.page.create({
      data: {
        title: title,
        userId: userId,
        content: content,
        parentId: parentId ?? null,
      },
    });
  },
  updatePage: async ({
    userId,
    id,
    title,
    content,
  }: {
    userId: string;
    id: string;
    title?: string;
    content?: object;
  }) => {
    return await prisma.page.update({
      where: {
        userId: userId,
        id: id,
      },
      data: {
        title: title,
        content: content ? cleanJson(content) : null,
      },
    });
  },
  deletePage: async (userId: string, id: string) => {
    return await prisma.page.delete({
      where: {
        userId: userId,
        id: id,
      },
    });
  },
};
