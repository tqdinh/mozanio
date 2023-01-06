import { RootState } from '@path/redux/stores/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PaymentResponse {
  id: number;
  payment_method: string;
  payment_type: string;
  status: string;
  payment_info: string;
  refund_requested_time: null;
  payment_completed_time: null;
  amount: string;
  payment_code: number;
  payment_gateway: string;
  transaction_id: null;
  transaction_status: null;
  refund_transaction_id: null;
  refund_transaction_status: null;
  customer: string;
  currency: number;
  updated_time: Date;
  created_time: Date;
  target_type: number;
  target_id: number;
  payment_url: string;
}

export interface PaymentState {
  status: string;
  payment_status: string;
  payment: PaymentResponse | null;
  isLoading: boolean;
}

const initialState: PaymentState = {
  status: 'idle',
  payment_status: '',
  payment: null,
  isLoading: false,
};
export const PaymentSlice = createSlice({
  name: 'Payment',
  initialState,
  reducers: {
    getPaymentMethod: (state, action: PayloadAction<any>) => {},
    getPaymentMethodSuccess: (state, action: PayloadAction<any>) => {},
    getPaymentMethodError: (state, action: PayloadAction<any>) => {},
    getPaymentStatus: (state, action: PayloadAction<any>) => {
      state.payment_status = 'CREATED';
    },
    getPaymentStatusSuccess: (state, action: PayloadAction<any>) => {
      state.payment_status = action.payload.status;
    },
    getPaymentStatusError: (state, action: PayloadAction<any>) => {},
    requestPayment: (state, action: PayloadAction<any>) => {
      state.status = 'pending';
      state.isLoading = true;
    },
    requestPaymentSuccess: (state, action: PayloadAction<any>) => {
      state.status = 'success';
      state.payment = action.payload;
      state.isLoading = false;
    },
    requestPaymentError: state => {
      state.status = 'error';
      state.isLoading = false;
    },
    clearCurrentPayment: state => {
      state.payment = null;
      state.payment_status = 'CREATED';
    },
  },
});

export default PaymentSlice.reducer;
export const paymentActions = PaymentSlice.actions;
export const selectPayment = (state: RootState) => state.payment.payment;
