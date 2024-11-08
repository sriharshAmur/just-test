import { Bike, Dot, Heart, Info, Star } from "lucide-react";

const MenuHeader = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Restaurant Image */}
      <div className="h-72 w-full bg-primary"></div>

      {/* Restaurant Info */}
      <div className="container mx-auto flex flex-col gap-2 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Restaurant Name</h1>
          <div className="flex items-center gap-2">
            <Info />
            <Heart />
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm">
          {/* Reviews */}
          <div className="flex items-center gap-2">
            <Star
              size={17}
              className="fill-primary text-primary"
            />
            <span className="underline">4.8 (200+)</span>
          </div>

          <Dot />

          {/* Delivery Fees */}
          <div className="flex items-center gap-1.5">
            <Bike size={17} />
            <div>€ 0.99 - € 3.49 </div>
            <Info size={17} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;
