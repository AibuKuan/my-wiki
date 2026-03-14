export type PageNesting = {
    id: string;
    userId: string;
    title: string;
    parentId: string | null;
    children: PageNesting[];
}