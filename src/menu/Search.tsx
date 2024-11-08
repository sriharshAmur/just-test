import { useMenuBasketStore } from "@/store/menuBasketStore";
import { Search as SearchIcon } from "lucide-react";

type Props = {};

const Search = (props: Props) => {
  const searchTerm = useMenuBasketStore((state) => state.searchTerm);
  const { setSearchTerm } = useMenuBasketStore();

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-black px-3 py-2">
      <SearchIcon
        size={20}
        className="text-primary"
      />
      <input
        type="text"
        placeholder="Search items of this restaurant"
        className="w-full outline-0 focus:border-0"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
