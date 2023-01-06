export enum UNIT_TYPE {
  PERCENT,
  COUNTABLE_OBJECT,
  LIST,
}

export interface Ingredient {
  name: string;
  unit: UNIT_TYPE;
  unit_value: any;
  min_quantity: any;
  default_quantity: any;
  max_quantity: any;
  isAllow: boolean;
  select_unit_record: number;
  select_unit_record_quantity: number;
}
export interface SubMenuItem {
  ingredients: Array<Ingredient>;
}

export const SupportedItems: SubMenuItem = {
  //total = unit_value[select_unit_record].price * select_unit_record_quantity
  ingredients: [
    {
      name: 'Type',
      unit: UNIT_TYPE.LIST,
      min_quantity: 0,
      default_quantity: 1,
      max_quantity: 2,
      isAllow: true,
      unit_value: [
        { unit_name: 'S', price: 10000 },
        { unit_name: 'M', price: 15000 },
        { unit_name: 'L', price: 20000 },
      ],
      select_unit_record: 1,
      select_unit_record_quantity: 1,
    },
    {
      name: 'Đường',
      unit: UNIT_TYPE.PERCENT,
      min_quantity: 0,
      default_quantity: 50,
      max_quantity: 100,
      isAllow: true,
      unit_value: [{ unit_name: 'percent', price: 0 }],
      select_unit_record: 0,
      select_unit_record_quantity: 50,
    },
    {
      name: 'Coffee',
      unit: UNIT_TYPE.COUNTABLE_OBJECT,
      min_quantity: 0.5,
      default_quantity: 1,
      max_quantity: 5,
      isAllow: true,
      unit_value: [{ unit_name: 'cup', price: 10000 }],
      select_unit_record: 0,
      select_unit_record_quantity: 2, // change this
    },

    {
      name: 'Đá',
      unit: UNIT_TYPE.LIST,
      min_quantity: 0,
      default_quantity: 1,
      max_quantity: 2,
      isAllow: true,
      unit_value: [
        { unit_name: '10%', price: 0 },
        { unit_name: '50%', price: 0 },
        { unit_name: '100', price: 0 },
      ],
      select_unit_record: 0, // change this
      select_unit_record_quantity: 1,
    },
  ],
};
