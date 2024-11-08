import data from "@/data.json";
import type { MenuList } from "@/types";
import ItemCard from "./ItemCard";

type Props = {};

const menuData: MenuList = data;

const MenuList = (props: Props) => {
  return (
    <div className="flex flex-col gap-8">
      {menuData.categories.map((menuCategory) => (
        <div key={menuCategory.id} className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">{menuCategory.name}</h2>
          <div className="flex flex-col gap-4">
            {menuCategory.items.map((menuItem) => (
              <ItemCard key={menuItem.id} item={menuItem} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
