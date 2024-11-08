import { Button } from "@/components/ui/button";
import useDynamicHeight from "@/hooks/DynamicHeight";

const Basket = () => {
  const basketHeight = useDynamicHeight();

  return (
    <div
      className="sticky right-0 top-0 w-1/4 min-w-[200px] max-w-[400px] border-l shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.2)]"
      style={{ height: basketHeight }}
    >
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="text-2xl font-bold">Basket</h1>
        <div></div>
        <div>Fees and Total</div>
        <Button className="bg-primary-darker w-full rounded-3xl text-lg">
          Checkout (total)
        </Button>
      </div>
    </div>
  );
};

export default Basket;
