export type MenuItem = SimpleItem | ComplexItem;

export type SimpleItem = {
  id: number;
  name: string;
  price: number;
  ingredients?: string;
  description?: string;
  type: "simple";
  restricted?: boolean;
};

export type ComplexItem = {
  id: number;
  name: string;
  price: number;
  ingredients?: string;
  description?: string;
  type: "complex";
  restricted?: boolean;
  variations?: Variation[];
  optionGroups?: OptionGroup[];
};

export type Variation = {
  id: number;
  name: string;
  price: number;
};

export type OptionGroup = {
  id: number;
  name: string;
  required: boolean;
  limit?: number;
  options: OptionItem[];
};

export type OptionItem = {
  id: number;
  name: string;
  price?: number;
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

export type AddBasketItem = MenuItem & {
  variation?: Variation;
  selectedOptions?: SelectedOption[];
};

export type BasketItem = AddBasketItem & {
  quantity: number;
};

export type SelectedOption = {
  groupId: number;
  optionId: number;
};

export type SelectedBasketOption = {
  group: OptionGroup;
  selectedOptions: OptionItem[];
};
