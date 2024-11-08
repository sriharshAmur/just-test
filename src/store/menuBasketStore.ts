import { MenuItem } from "@/types";
import { create } from "zustand";

type Item = MenuItem & {
  quantity: number;
};

type MenuBasketState = {
  searchTerm: string;
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  setSearchTerm: (searchTerm: string) => void;
};

export const useMenuBasketStore = create<MenuBasketState>((set) => ({
  searchTerm: "",
  items: [],
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  addItem: (item: Item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),
  removeItem: (item: Item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i,
          ),
        };
      }
      return {
        items: state.items.filter((i) => i.id !== item.id),
      };
    }),
}));
