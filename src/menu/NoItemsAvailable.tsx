import { Search } from "lucide-react";

const NoItemsAvailable = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-16">
    <Search className="h-16 w-16 text-gray-400" />
    <p className="text-xl font-semibold text-gray-600">
      Sorry, no items match your search.
    </p>
    <p className="text-gray-500">
      Try searching for something else or browse the categories above.
    </p>
  </div>
);

export default NoItemsAvailable;
