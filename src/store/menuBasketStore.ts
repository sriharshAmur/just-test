import { BasketItem, MenuItem } from "@/types";
import { create } from "zustand";

type Fee = {
  name: string;
  amount: number;
  info: string;
};

type MenuBasketState = {
  searchTerm: string;
  items: BasketItem[];
  fees: Fee[];
  getTotal: () => number;
  addItem: (item: MenuItem) => void;
  removeItem: (item: MenuItem) => void;
  setSearchTerm: (searchTerm: string) => void;
};

export const useMenuBasketStore = create<MenuBasketState>((set, get) => ({
  searchTerm: "",
  items: [],
  fees: [
    {
      name: "Delivery Fee",
      amount: 5,
      info: "Delivery Fee",
    },
    {
      name: "Service Charge",
      amount: 1,
      info: "Service Charge",
    },
  ],
  getTotal: () => {
    const items = get().items || [];
    const fees = get().fees || [];

    if (items.length === 0) return 0;

    const itemsTotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const feesTotal = fees.reduce((acc, fee) => acc + fee.amount, 0);

    return itemsTotal + feesTotal;
  },
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  addItem: (item: MenuItem) =>
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
  removeItem: (item: MenuItem) =>
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
