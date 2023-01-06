export interface IngredientsModal {
  id: number;
  item: number;
  material: {
    id: number;
    name: string;
    display_name: string;
    category: string;
    measurement_unit: string;
  };
  min_value: number;
  max_value: number;
  measurement_unit: string;
}
export interface SizeRecipeModal {
  id: number;
  item: number;
  material: {
    id: number;
    name: string;
    display_name: string;
    category: string;
    measurement_unit: string;
  };
  size: number;
  amount: number;
}
export interface SizeConfigModal {
  id: number;
  product_size: {
    id: number;
    thumbnail: {
      id: number;
      url: string;
    };
    name: string;
    display_name: string;
    measurement_unit: string;
  };
  amount: number;
  size_price: number;
  net_weight: number;
  item: number;
  gross_weight: number;
  size_recipe: Array<SizeRecipeModal>;
}

export interface AdditionalItemsModal {
  id: number;
  additional_item: {
    id: number;
    name: string;
    sold_counted: number;
    default_size: number;
    default_price: number;
  };
  adjustable: boolean;
  min_value: number;
  max_value: number;
  measurement_unit: string;
  item: number;
}

export interface MenuItemModal {
  id: number;
  default_price: number;
  default_size: number;
  name: string;
  sold_counted: number;
  status: string;
  item: {
    id: number;
    name: string;
    display_name: string;
    images: any;
    thumbnail: object | null;
    description: string;
    status: string;
    category: number;
    creator: string;
    vendor: string;
    base_price: number;
    base_size: number;
    sold_counted: number;
    size_config: Array<SizeConfigModal>;
    ingredients: Array<IngredientsModal>;
    additional_items: Array<AdditionalItemsModal>;
    service_category: number;
  };
  vendor_branch: string;
  additional_items: any;
  size_config: any;
}

export interface ListMenuModal {
  count: number;
  next: string;
  previous: string;
  results: Array<MenuItemModal>;
}

export const EmptyListMenu = {
  count: 0,
  next: '',
  previous: '',
  results: [],
};
