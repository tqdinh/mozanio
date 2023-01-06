export interface CategoriesModal {
  count: number;
  next: string;
  previous: string;
  results: Array<MenuCategoriesModal> | Array<ServiceCategoriesModal>;
}

export interface MenuCategoriesModal {
  id: string;
  name: string;
  display_name: string;
  thumbnail: Object | null;
  sold_counted: number;
  description: string;
  status: string;
  vendor: string;
  created_time: Date;
  updated_time: Date;
}

export interface ServiceCategoriesModal {
  id: number;
  name: string;
  display_name: string;
  thumbnail: {
    id: any;
    url: string;
  };
}

export const EmptyMenuCategories = {
  count: 0,
  next: '',
  previous: '',
  results: [],
};
