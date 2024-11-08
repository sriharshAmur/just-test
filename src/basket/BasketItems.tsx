import { Separator } from "@/components/ui/separator";
import { useMenuBasketStore } from "@/store/menuBasketStore";
import Item from "./Item";

const BasketItems = () => {
  const items = useMenuBasketStore((state) => state.items);

  return (
    <div className="flex w-full flex-col gap-4">
      {items.map((item, index) => (
        <>
          <Item
            key={item.id}
            item={item}
          />
          {index === items.length - 1 ? null : <Separator />}
        </>
      ))}
    </div>
  );
};

export default BasketItems;
