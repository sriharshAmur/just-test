import { cn } from "@/lib/utils";
import { useMenuBasketStore } from "@/store/menuBasketStore";
import { MenuItem } from "@/types";
import { Plus } from "lucide-react";

type Props = {
  item: MenuItem;
};

const ItemCard = ({ item }: Props) => {
  const { addItem } = useMenuBasketStore();

  return (
    <div className="relative flex cursor-pointer items-center rounded-lg border border-gray-300 px-4 py-4 hover:bg-gray-100">
      <div className="flex flex-1 flex-col gap-1.5">
        <div>
          <h3 className="font-bold">{item.name}</h3>
          <p className="text-sm font-semibold">€ {item.price}</p>
        </div>
        {item.description && (
          <p className="text-sm text-gray-700">{item.description}</p>
        )}
        {item.ingredients && (
          <p className="text-xs text-gray-600">{item.ingredients}</p>
        )}
      </div>

      <div onClick={() => addItem(item)}>
        {item.id % 2 === 0 ? (
          <div className="relative h-24 w-24 rounded-md bg-gray-300">
            <QuickAddIcon positionClasses="absolute -top-2 -right-2" />
          </div>
        ) : (
          <QuickAddIcon positionClasses="absolute top-2 right-2" />
        )}
      </div>
    </div>
  );
};

type QuickAddIconProps = {
  positionClasses: string;
};

const QuickAddIcon = ({ positionClasses }: QuickAddIconProps) => {
  return (
    <div className={cn(positionClasses)}>
      <button
        className="rounded-full border bg-white p-1 shadow-md hover:bg-gray-200 focus:outline-none"
        aria-label="Add item"
      >
        <Plus className="h-5 w-5 text-primary" />
      </button>
    </div>
  );
};

export default ItemCard;
