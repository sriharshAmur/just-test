export type MenuItem = {
  id: number;
  name: string;
  price: number;
  ingredients?: string;
  description?: string;
};

export type MenuCategory = {
  id: number;
  name: string;
  items: MenuItem[];
};

export type MenuList = {
  categories: MenuCategory[];
};

export type BasketItem = MenuItem & {
  quantity: number;
};
