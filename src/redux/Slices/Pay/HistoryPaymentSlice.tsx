import { ItemHistoryPayment } from '@path/models/HistoryPayment';
import { RootState } from '@path/redux/stores/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListHistoryPaymentState {
  count: number;
  next: string;
  previous: string;
  currentListHistoryPayment: Array<ItemHistoryPayment>;
  currentItemHistoryPayment?: ItemHistoryPayment;
  isLoading: boolean;
  isLoadingMore: boolean;
}
const initialState: ListHistoryPaymentState = {
  count: 0,
  next: '',
  previous: '',
  currentListHistoryPayment: [],
  currentItemHistoryPayment: undefined,
  isLoading: false,
  isLoadingMore: false,
};

export const HistoryPaymentSlice = createSlice({
  name: 'HistoryPayment',
  initialState,
  reducers: {
    getListHistoryPayment: (state, action: PayloadAction<any>) => {
      state.count = 0;
      state.next = '';
      state.previous = '';
      state.currentListHistoryPayment = [];
      state.isLoading = true;
      state.isLoadingMore = false;
    },
    getListHistoryPaymentSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoadingMore = false;
      state.count = action.payload.count;
      state.next = action.payload.next;
      state.currentListHistoryPayment = action.payload.results;
    },
    getListHistoryPaymentError: state => {
      state.isLoading = false;
      state.isLoadingMore = false;
    },
    getMoreListHistoryPaymnet: state => {
      state.isLoadingMore = true;
      state.isLoading = false;
    },
    getMoreListHistoryPaymnetSuccess: (state, action: PayloadAction<any>) => {
      state.isLoadingMore = false;
      state.isLoading = false;
      state.currentListHistoryPayment = state.currentListHistoryPayment.concat(
        action.payload.results,
      );
      state.next = action.payload.next;
    },
    getMoreListHistoryPaymnetError: state => {
      state.isLoading = false;
      state.isLoadingMore = false;
    },
  },
});

export default HistoryPaymentSlice.reducer;
export const historyPaymentActions = HistoryPaymentSlice.actions;
export const selectLoadingHistoryPayment = (state: RootState) =>
  state.historyPayment.isLoading;
export const selectLoadingMoreHistoryPayment = (state: RootState) =>
  state.historyPayment.isLoadingMore;
export const selectListHistoryPayment = (state: RootState) =>
  state.historyPayment.currentListHistoryPayment;
export const selectCurrentSelectedHistoryPaymentItem = (state: RootState) =>
  state.historyPayment.currentItemHistoryPayment;
export const selectNextListHistoryPayment = (state: RootState) =>
  state.historyPayment.next;
