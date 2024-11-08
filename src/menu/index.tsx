import { Search } from "lucide-react";
import MenuHeader from "./MenuHeader";
import MenuList from "./MenuList";

type Props = {};

const Menu = (props: Props) => {
  return (
    <div className="flex flex-1 flex-col gap-4 pb-8">
      <MenuHeader />
      <div className="container mx-auto flex flex-col gap-6 px-4">
        <div className="flex items-center gap-4 rounded-2xl border border-black px-3 py-2">
          <Search
            size={20}
            className="text-primary"
          />
          <input
            type="text"
            placeholder="Search items of this restaurant"
            className="w-full outline-0 focus:border-0"
          />
        </div>
        <MenuList />
      </div>
    </div>
  );
};

export default Menu;
