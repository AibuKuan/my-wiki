export function buildTree(pages: any[]) {
  const map = new Map();
  const roots: any[] = [];

  // Initialize map with pages and empty children arrays
  pages.forEach(page => {
    map.set(page.id, { ...page, children: [] });
  });

  pages.forEach(page => {
    if (page.parentId) {
      const parent = map.get(page.parentId);
      if (parent) {
        parent.children.push(map.get(page.id));
      }
    } else {
      roots.push(map.get(page.id));
    }
  });

  return roots;
}