import { MenuList } from "@/types";

const useFilteredCategories = (searchTerm: string, menuData: MenuList) => {
  return menuData.categories
    .map((menuCategory) => {
      const filteredItems = menuCategory.items.filter((menuItem) =>
        menuItem.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      return { ...menuCategory, items: filteredItems };
    })
    .filter((category) => category.items.length > 0);
};

export default useFilteredCategories;
