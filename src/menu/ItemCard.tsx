import { cn } from "@/lib/utils";
import { useMenuBasketStore } from "@/store/menuBasketStore";
import { AddBasketItem, MenuItem } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import ItemSelector from "./ItemSelector";

interface ItemCardProps {
  item: MenuItem;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useMenuBasketStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type === "simple") {
      addItem(item);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleAddToBasket = (item: AddBasketItem) => {
    addItem(item);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="relative flex cursor-pointer items-center rounded-lg border border-gray-300 px-4 py-4 hover:bg-gray-100"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-1 flex-col gap-1.5">
          <div>
            <h3 className="font-bold">{item.name}</h3>
            <p className="text-sm font-semibold">€{item.price.toFixed(2)}</p>
          </div>
          {item.description && (
            <p className="text-sm text-gray-700">{item.description}</p>
          )}
          {item.ingredients && (
            <p className="text-xs text-gray-600">{item.ingredients}</p>
          )}
        </div>

        <div className="relative h-24 w-24 rounded-md bg-gray-300">
          <QuickAddIcon
            positionClasses="absolute -top-2 -right-2"
            onClick={handleQuickAdd}
          />
        </div>
      </div>

      <ItemSelector
        item={item}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToBasket={handleAddToBasket}
      />
    </>
  );
};

type QuickAddIconProps = {
  positionClasses: string;
  onClick: (e: React.MouseEvent) => void;
};

const QuickAddIcon = ({ positionClasses, onClick }: QuickAddIconProps) => {
  return (
    <div className={cn(positionClasses)}>
      <button
        className="rounded-full border bg-white p-1 shadow-md hover:bg-gray-200 focus:outline-none"
        aria-label="Add item"
        onClick={onClick}
      >
        <Plus className="h-5 w-5 text-primary" />
      </button>
    </div>
  );
};

export default ItemCard;
