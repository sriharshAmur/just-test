import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b px-4 py-4">
      <div className="flex flex-1 items-center gap-x-2">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-6 w-6"
        />
        <span className="text-xl font-semibold text-primary">Just Test</span>
      </div>
      <div className="hidden flex-1 text-center md:block">Menu</div>
      <div className="flex-1 cursor-pointer justify-items-end">
        <Menu />
      </div>
    </header>
  );
};

export default Header;
