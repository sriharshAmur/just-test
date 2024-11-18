import { useMenuBasketStore } from "@/store/menuBasketStore";
import { BasketItem, ComplexItem } from "@/types";
import { Minus, Plus, Trash } from "lucide-react";

type Props = {
  item: BasketItem;
};

const Item = ({ item }: Props) => {
  const { addItem, removeItem } = useMenuBasketStore();

  // const getItemTotals = () => {
  //   const variationPrice = item.variation?.price || 0;
  //   const optionsTotal = (item.selectedOptions || []).reduce(
  //     (acc, selectedOption) => {
  //       const group = (item as ComplexItem)?.optionGroups?.find(
  //         (g) => g.id === selectedOption.groupId,
  //       );
  //       const option = group?.options.find(
  //         (o) => o.id === selectedOption.optionId,
  //       );
  //       return acc + (option?.price || 0);
  //     },
  //     0,
  //   );
  //   const itemUnitPrice = item.price + variationPrice + optionsTotal;
  //   const itemTotal = itemUnitPrice * item.quantity;

  //   return { itemUnitPrice, itemTotal };
  // };

  // const { itemTotal } = getItemTotals();

  return (
    <div
      className="flex flex-col gap-2"
      data-qa={`basket-item-${item.id}`}
    >
      <div
        className="flex items-start justify-between px-2"
        data-qa="basket-item-header"
      >
        <div
          className="font-bold underline"
          data-qa="basket-item-name"
        >
          {item.name}
        </div>
        <div className="text-right">
          <div data-qa="basket-item-price">€{item.price}</div>
        </div>
      </div>
      <div
        className="pl-2"
        data-qa="basket-item-details"
      >
        {item.variation && (
          <div
            className="text-sm text-gray-700"
            data-qa="basket-item-variation"
          >
            <div className="font-semibold">Variation:</div>

            <div className="flex items-center justify-between">
              <div>{item.variation.name}</div>
              <div>(+€{item.variation.price})</div>
            </div>
          </div>
        )}
        {item?.selectedOptions && item?.selectedOptions?.length > 0 && (
          <div
            className="mt-1 text-sm text-gray-700"
            data-qa="basket-item-options"
          >
            <span className="font-semibold">Options:</span>
            <ul className="list-inside list-disc">
              {item.selectedOptions!.map((selectedOption) => {
                const group = (item as ComplexItem)?.optionGroups?.find(
                  (g) => g.id === selectedOption.groupId,
                );
                const option = group?.options.find(
                  (o) => o.id === selectedOption.optionId,
                );

                return group && option ? (
                  <li
                    key={`${group.id}-${option.id}`}
                    className="flex justify-between"
                    data-qa={`basket-item-option-${group.id}-${option.id}`}
                  >
                    <span>{option.name}</span>
                    {option.price !== undefined && (
                      <span className="text-gray-500">(+€{option.price})</span>
                    )}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}
      </div>
      <div
        className="ml-auto flex items-center gap-4 rounded-2xl bg-gray-200 px-2 py-1"
        data-qa="basket-item-quantity-controls"
      >
        <div
          className="cursor-pointer"
          onClick={() => removeItem(item)}
          data-qa="basket-item-decrease-button"
        >
          {item.quantity > 1 ? <Minus /> : <Trash size={17} />}
        </div>
        <div data-qa="basket-item-quantity">{item.quantity}</div>
        <div
          className="cursor-pointer"
          onClick={() => addItem(item)}
          data-qa="basket-item-increase-button"
        >
          <Plus size={17} />
        </div>
      </div>
    </div>
  );
};

export default Item;
