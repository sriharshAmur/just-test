import {
  AddBasketItem,
  BasketItem,
  ComplexItem,
  MenuItem,
  SelectedOption,
} from "@/types";
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
  addItem: (item: AddBasketItem) => void;
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

    const itemsTotal = items.reduce((acc, item) => {
      const variationPrice = item.variation ? item.variation.price : 0;
      const optionsTotal = (item.selectedOptions || []).reduce(
        (optAcc, opt) => {
          const group = (item as ComplexItem)?.optionGroups?.find(
            (g) => g.id === opt.groupId,
          );
          const selectedOption = group?.options.find(
            (o) => o.id === opt.optionId,
          );
          return optAcc + (selectedOption?.price || 0);
        },
        0,
      );
      const itemTotal =
        (item.price + variationPrice + optionsTotal) * item.quantity;
      return acc + itemTotal;
    }, 0);

    const feesTotal = fees.reduce((acc, fee) => acc + fee.amount, 0);

    return itemsTotal + feesTotal;
  },
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  addItem: (item: AddBasketItem) =>
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.id === item.id && i.variation?.id === item.variation?.id,
      );
      const hasSameOptions = (
        aOptions: SelectedOption[] = [],
        bOptions: SelectedOption[] = [],
      ) =>
        aOptions.length === bOptions.length &&
        aOptions.every((aOpt) =>
          bOptions.some(
            (bOpt) =>
              aOpt.groupId === bOpt.groupId && aOpt.optionId === bOpt.optionId,
          ),
        );

      if (
        existingItem &&
        hasSameOptions(existingItem.selectedOptions, item.selectedOptions)
      ) {
        return {
          items: state.items.map((i) =>
            i.id === item.id &&
            i.variation?.id === item.variation?.id &&
            hasSameOptions(i.selectedOptions, item.selectedOptions)
              ? { ...i, quantity: i.quantity + 1 }
              : i,
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
