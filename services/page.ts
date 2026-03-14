import { prisma } from "@/lib/prisma";

export const pageService = {
  getPages: async (userId: string) => {
    return await prisma.page.findMany({
      where: {
        userId: userId,
        parentId: null,
      },
      include: {
        children: {
          // You can also sort the children inside the include!
          orderBy: {
            title: "asc",
          },
        },
        parent: true,
      },
      orderBy: {
        title: "asc", // Sorts the main list of pages
      },
    });
  },
  getPage: async (id: string) => {
    return await prisma.page.findUnique({
      where: {
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
    parentId?: string,
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
    id,
    title,
    content,
  }: {
    id: string;
    title?: string;
    content?: object;
  }) => {
    return await prisma.page.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
      },
    });
  },
  deletePage: async (id: string) => {
    return await prisma.page.delete({
      where: {
        id: id,
      },
    });
  },
};
