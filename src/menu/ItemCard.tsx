import { cn } from "@/lib/utils";
import { useMenuBasketStore } from "@/store/menuBasketStore";
import { AddBasketItem, MenuItem } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import ItemSelector from "./ItemSelector";
import AgeVerificationModal from "./AgeVerificationModal";

interface ItemCardProps {
  item: MenuItem;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgeVerificationModalOpen, setIsAgeVerificationModalOpen] =
    useState(false);
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

  const handleItemClick = () => {
    // setIsAgeVerificationModalOpen(true);
    setIsModalOpen(true);
  };

  const handleAgeVerification = (isAbove18: boolean) => {
    if (isAbove18) {
      setIsModalOpen(true);
    } else {
      console.log("User is under 18. Access denied.");
    }
  };

  return (
    <>
      <div
        className="relative flex cursor-pointer items-center rounded-lg border border-gray-300 px-4 py-4 hover:bg-gray-100"
        onClick={handleItemClick}
        data-qa="item-card"
      >
        <div
          className="flex flex-1 flex-col gap-1.5"
          data-qa="item-details"
        >
          <div>
            <h3
              className="font-bold"
              data-qa="item-name"
            >
              {item.name}
              {item.restricted && (
                <span className="mx-2 rounded bg-gray-200 p-1 text-sm font-semibold">
                  18+
                </span>
              )}
            </h3>
            <p
              className="text-sm font-semibold"
              data-qa="item-price"
            >
              €{item.price.toFixed(2)}
            </p>
          </div>
          {item.description && (
            <p
              className="text-sm text-gray-700"
              data-qa="item-description"
            >
              {item.description}
            </p>
          )}
          {item.ingredients && (
            <p
              className="text-xs text-gray-600"
              data-qa="item-ingredients"
            >
              {item.ingredients}
            </p>
          )}
        </div>
        <div
          className="relative h-24 w-24 rounded-md bg-gray-300"
          data-qa="item-image"
        >
          <QuickAddIcon
            positionClasses="absolute -top-2 -right-2"
            onClick={handleQuickAdd}
          />
        </div>
      </div>

      <AgeVerificationModal
        isOpen={isAgeVerificationModalOpen}
        onClose={() => setIsAgeVerificationModalOpen(false)}
        onVerify={handleAgeVerification}
      />

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
    <div
      className={cn(positionClasses)}
      data-qa="quick-add-icon-container"
    >
      <button
        className="rounded-full border bg-white p-1 shadow-md hover:bg-gray-200 focus:outline-none"
        aria-label="Add item"
        onClick={onClick}
        data-qa="quick-add-button"
      >
        <Plus className="h-5 w-5 text-primary" />
      </button>
    </div>
  );
};

export default ItemCard;
