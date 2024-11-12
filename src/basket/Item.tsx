import { useMenuBasketStore } from "@/store/menuBasketStore";
import { BasketItem } from "@/types";
import { Minus, Plus, Trash } from "lucide-react";

type Props = {
  item: BasketItem;
};

const Item = ({ item }: Props) => {
  const { addItem, removeItem } = useMenuBasketStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-1 px-2">
        <div className="flex-1 break-words font-bold underline">
          {item.name}
        </div>
        <div className="text-right">
          <div>€{item.price}</div>
          {item.variation && (
            <div className="text-sm text-gray-500">
              (+€{item.variation.price})
            </div>
          )}
        </div>
      </div>

      <div className="pl-2">
        {item.variation && (
          <div className="text-sm text-gray-700">
            <span className="font-semibold">Variation:</span>{" "}
            {item.variation.name}
          </div>
        )}
        {item.selectedOptions && item.selectedOptions.length > 0 && (
          <div className="mt-1 text-sm text-gray-700">
            <span className="font-semibold">Options:</span>
            <ul className="list-inside list-disc">
              {item.selectedOptions.map((option) => (
                <li
                  key={option.id}
                  className="flex justify-between"
                >
                  <span>{option.name}</span>
                  {option.price && (
                    <span className="text-gray-500">(+€{option.price})</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="ml-auto flex w-fit select-none items-center gap-4 rounded-2xl bg-gray-200 px-2 py-1">
        <div
          className="cursor-pointer"
          onClick={() => removeItem(item)}
        >
          {item.quantity > 1 ? <Minus /> : <Trash size={17} />}
        </div>
        <div>{item.quantity}</div>
        <div
          className="cursor-pointer"
          onClick={() => addItem(item)}
        >
          <Plus size={17} />
        </div>
      </div>
    </div>
  );
};

export default Item;
