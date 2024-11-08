import { Separator } from "@/components/ui/separator";
import { useMenuBasketStore } from "@/store/menuBasketStore";
import { ShoppingBasket } from "lucide-react";

const FeesAndTotal = () => {
  const { getTotal } = useMenuBasketStore();
  const fees = useMenuBasketStore((state) => state.fees);
  const items = useMenuBasketStore((state) => state.items);
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2 py-4">
        <ShoppingBasket size={40} />
        <p className="text-gray-500">Your basket is empty.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-1.5 px-2">
      {fees.map((fee) => (
        <div
          key={fee.name}
          className="flex items-start justify-between gap-1"
        >
          <div className="flex-1 break-words">{fee.name}</div>
          <div className="text-right">€{fee.amount}</div>
        </div>
      ))}
      <Separator />
      <div className="flex items-center justify-between gap-1 font-bold">
        <div className="flex-1">Total</div>
        <div className="text-right">€{total}</div>
      </div>
    </div>
  );
};

export default FeesAndTotal;
