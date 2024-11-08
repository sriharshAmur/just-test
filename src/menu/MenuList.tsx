import data from "@/data.json";
import { useMenuBasketStore } from "@/store/menuBasketStore";
import useFilteredCategories from "@/hooks/useFilteredCategories";
import ItemCard from "./ItemCard";
import NoItemsAvailable from "./NoItemsAvailable";

const MenuList = () => {
  const searchTerm = useMenuBasketStore((state) => state.searchTerm);
  const filteredCategories = useFilteredCategories(searchTerm, data);

  if (filteredCategories.length === 0) {
    return <NoItemsAvailable />;
  }

  return (
    <div className="flex flex-col gap-8">
      {filteredCategories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col gap-3"
        >
          <h2 className="text-lg font-bold">{category.name}</h2>
          <div className="flex flex-col gap-4">
            {category.items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
