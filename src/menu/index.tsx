import MenuHeader from "./MenuHeader";
import MenuList from "./MenuList";
import Search from "./Search";

const Menu = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 pb-8">
      <MenuHeader />
      <div className="container mx-auto flex flex-col gap-6 px-4">
        <Search />
        <MenuList />
      </div>
    </div>
  );
};

export default Menu;
