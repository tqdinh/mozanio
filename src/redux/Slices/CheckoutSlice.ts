import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../stores/store';

export interface PaymentMethod {
  identifier: string;
  label: string;
  error: string;
}
export interface GetOrCreateCheckoutPayload {
  payment_methods: PaymentMethod[];
  url: string;
  status: any;
  isLoading: boolean;
}
export const initialState: GetOrCreateCheckoutPayload = {
  url: '',
  payment_methods: [],
  status: 'idle',
  isLoading: false,
};
export const CheckoutSlice = createSlice({
  name: 'Checkout',
  initialState,
  reducers: {
    createCheckout: (state, action: PayloadAction<any>) => {
      state.status = 'pending';
      state.isLoading = true;
    },
    createCheckoutSuccess: (state, action: PayloadAction<any>) => {
      state.url = action.payload;
      state.status = 'success';
      state.isLoading = false;
    },
    createCheckoutError: (state, action: PayloadAction<any>) => {
      console.log(`create checkout rrror`);
      console.log(action.payload);
      state.status = 'fail';
      state.isLoading = false;
    },
    updateStatusToIdle: state => {
      state.status = 'idle';
    },

    getCheckout: state => {},
    getCheckoutSuccess: (state, action: PayloadAction<any>) => {
      state.payment_methods = action.payload;
      console.log('Check out success', state.payment_methods);
    },
    getCheckoutError: (state, action: PayloadAction<any>) => {},
  },
});

export const checkoutActions = CheckoutSlice.actions;
export default CheckoutSlice.reducer;

export const selectPaymentMethod = (state: RootState) =>
  state.checkout.payment_methods;
export const selectUrlCreateCheckout = (state: RootState) => state.checkout.url;
export const selectStatusCheckout = (state: RootState) => state.checkout.status;
