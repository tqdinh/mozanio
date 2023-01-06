import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { number } from 'prop-types';
import { RootState } from '../stores/store';

export interface BasketItemPayload {
  url: string;
  ref: string;
  product_type: string;
  product_id: number;
  product: {
    name: string;
    code: string;
    vendor_branch: string;
  };
  unit_price: string;
  quantity: number;
  subtotal: string;
  extra_rows: [];
  total: string;
  extra: {};
}

export interface ExtraConfig {
  size_config: {
    id: number;
    branch_price: string;
    size: {
      id: number;
      product_size: {
        id: number;
        name: string;
        display_name: string;
        measurement_unit: string;
      };
      amount: number;
      size_price: string;
      net_weight: number;
      gross_weight: number;
      size_recipe: Array<{
        id: number;
        amount: number;
        material: {
          id: number;
          name: string;
          display_name: string;
          category: string;
          measurement_unit: string;
        };
      }>;
    };
  };
  additional_items: Array<{
    id: number;
    additional_item: {
      id: number;
      name: string;
      sold_counted: number;
      default_size: number;
      default_price: string;
    };
    adjustable: boolean;
    amount: number;
    measurement_unit: string;
  }>;
}

export interface BasketPayload {
  id: number;
  items: BasketItemPayload[];
  subtotal: number;
  extra_rows: [];
  total: number;
  extra: any;
}

export interface BasketState {
  status: string;
  error: any;
  payload: BasketPayload;
}

export const initialState: BasketState = {
  status: 'idle',
  error: null,
  payload: {
    id: 0,
    items: [],
    subtotal: 0,
    extra_rows: [],
    total: 0,
    extra: {},
  },
};
const BasketSlice = createSlice({
  name: 'Basket',
  initialState,
  reducers: {
    getOrCreateBasket: state => {
      state.status = 'loading';
    },
    getOrCreateBasketSuccess: (state, action: PayloadAction<any>) => {
      state.status = 'succeeded';
      state.payload = action.payload;
    },
    getOrCreateBasketError: (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.error = action.payload;
    },
    addUserBasketItem: (state, action: PayloadAction<any>) => {},
    addUserBasketItemError: (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.error = action.payload;
    },
    addUserBasketItemSuccess: (state, action: PayloadAction<any>) => {
      state.payload = action.payload;
    },
    addUserBasketItemWithDefaulConfig: (
      state,
      action: PayloadAction<any>,
    ) => {},
    addUserBasketItemWithDefaulConfigError: (
      state,
      action: PayloadAction<any>,
    ) => {
      state.status = 'error';
      state.error = action.payload;
    },
    addUserBasketItemWithDefaulConfigSuccess: (
      state,
      action: PayloadAction<any>,
    ) => {
      state.payload = action.payload;
    },

    removeUserBasketItem: (state, action: PayloadAction<any>) => {},
    removeUserBasketItemError: (state, action: PayloadAction<any>) => {},
    removeUserBasketItemSuccess: (state, action: PayloadAction<any>) => {
      state.payload = action.payload;
      state.status = 'succeeded';
    },
    updateUserBasketItem: (state, action: PayloadAction<any>) => {},
    updateUserBasketItemError: (state, action: PayloadAction<any>) => {},
    updateUserBasketItemSuccess: (state, action: PayloadAction<any>) => {
      state.payload = action.payload;
    },
    addSameUserBasketItemWithDifferentConfig: (
      state,
      action: PayloadAction<any>,
    ) => {},
    addSameUserBasketItemWithDifferentConfigError: (
      state,
      action: PayloadAction<any>,
    ) => {},
    addSameUserBasketItemWithDifferentConfigSuccess: (
      state,
      action: PayloadAction<any>,
    ) => {
      state.payload = action.payload;
    },

    deleteBasket: () => {},
    deleteBasketSuccess: (state, action: PayloadAction<any>) => {
      console.log('delete baslet success');
    },
    deleteBasketError: (state, action: PayloadAction<any>) => {},

    clearBasket: () => {},
    clearBasketSuccess: (state, action: PayloadAction<any>) => {
      state.payload = action.payload;
      console.log('Clear baslet success');
    },
    clearBasketError: state => {
      state.error = null;
    },
  },
});

export default BasketSlice.reducer;
export const basketActions = BasketSlice.actions;
export const selectAllBasketItem = (state: RootState) =>
  state.basket.payload.items;

export const selectTotalItemCountOnBasket = (state: RootState) =>
  state.basket.payload.items.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);
export const selectTotalAmountOnBasket = (state: RootState) =>
  state.basket.payload.subtotal;

export const selectItemBasketWithId = (state: RootState, itemId: number) =>
  state.basket.payload.items.find(item => item.product_id == itemId);
export const selectListItemBasketWithId = (state: RootState, itemId: number) =>
  state.basket.payload.items.filter(item => item.product_id == itemId);
export const selectLatestBasketBranchID = (state: RootState) =>
  state.basket.payload.extra.vendor_branch;
export const selectStatus = (state: RootState) => state.basket.status;
