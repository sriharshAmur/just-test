import { Button } from "@/components/ui/button";
import useDynamicHeight from "@/hooks/DynamicHeight";
import BasketItems from "./BasketItems";
import { useMenuBasketStore } from "@/store/menuBasketStore";
import FeesAndTotal from "./FeesAndTotal";

const Basket = () => {
  const basketHeight = useDynamicHeight();
  const { getTotal } = useMenuBasketStore();
  const total = getTotal();

  return (
    <div
      className="sticky right-0 top-0 w-1/4 min-w-[200px] max-w-[400px] border-l border-t-0 shadow-[inset_0px_5px_10px_-5px_rgba(0,0,0,0.2),-10px_0_15px_-5px_rgba(0,0,0,0.2)]"
      style={{ height: basketHeight }}
    >
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-2xl font-bold">Basket</h1>
        <BasketItems />
        <FeesAndTotal />
        <Button
          className="bg-primary-darker w-full rounded-3xl text-lg"
          disabled={total === 0}
        >
          Checkout (€{total})
        </Button>
      </div>
    </div>
  );
};

export default Basket;
