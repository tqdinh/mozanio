import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../stores/store';
import { BranchModel } from './BranchesSlice';

export interface MenuItem {
  id: string;
  product_type: string;
  product_id: string;
  product: {};
  unit_price: any;
  quantity: any;
  subtotal: any;
  extra_rows: [];
  total: any;
  extra: {};
}
export interface OrderItemPayload {
  id: string;
  url: string;
  ref: string;
  status: string;
  status_display: string;
  date_created: string;
  date_updated: string;
  is_paid: boolean;
  user: string;
  email: string;
  billing_address: string;
  shipping_address: string;
  subtotal: any;
  total: any;
  extra: any;
  amount_outstanding: any;
  amount_paid: any;
  extra_rows: [];
  items: Array<MenuItem>[];
  vendor_branch: Array<BranchModel>;
}

export interface OrderPayload {
  count: 0;
  next: null;
  previous: null;
  items: OrderItemPayload[];
  currentSelectedItem: any;
}
export interface OrderState {
  status: string;
  error: any;
  payload: OrderPayload;
}
const initialState: OrderState = {
  status: 'idle',
  error: null,
  payload: {
    count: 0,
    next: null,
    previous: null,
    items: [],
    currentSelectedItem: null,
  },
};
const OrderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    getOrderByUrl: (state, action: PayloadAction<any>) => {
      state.payload.currentSelectedItem = action.payload;
      state.payload.items.push(action.payload);
    },
    getOrderHistory: state => {
      state.status = 'loading';
    },
    getOrderHistorySuccess: (state, action: PayloadAction<any>) => {
      state.payload.count = action.payload.count;
      state.payload.next = action.payload.next;
      state.payload.previous = action.payload.previous;
      state.payload.items = action.payload.results;
      state.status = 'success';
    },
    getOrderHistoryError: (state, action: PayloadAction<any>) => {
      state.status = 'error';
    },
    getMoreOrderHistory: state => {
      state.status = 'loading';
    },
    getMoreOrderHistorySuccess: (state, action: PayloadAction<any>) => {
      state.payload.count = action.payload.count;
      state.payload.next = action.payload.next;
      state.payload.previous = action.payload.previous;
      state.payload.items = state.payload.items.concat(action.payload.results);
      state.status = 'success';
    },
    getMoreOrderHistoryError: (state, action: PayloadAction<any>) => {
      state.status = 'error';
    },

    getOrderDetail: (state, action: PayloadAction<any>) => {
      state.status = 'loading';
      if (null != state.payload.currentSelectedItem)
        if (state.payload.currentSelectedItem.ref == action.payload)
          state.payload.currentSelectedItem = null;
    },

    getOrderDetailSuccess: (state, action: PayloadAction<any>) => {
      state.status = 'success';
      state.payload.currentSelectedItem = action.payload;
    },
    getOrderDetailError: (state, action: PayloadAction<any>) => {
      state.status = 'error';
    },
    clearCurrentOrder: state => {
      state.payload.currentSelectedItem = null;
    },
  },
});

export default OrderSlice.reducer;
export const orderActions = OrderSlice.actions;
export const selectAllOrders = (state: RootState) => state.order.payload.items;
export const selectCurrentSelectedOrder = (state: RootState) =>
  state.order.payload.currentSelectedItem;
