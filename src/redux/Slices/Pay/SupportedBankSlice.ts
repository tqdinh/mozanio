import {
  SUPPORTED_BANK_IMG,
  SUPPORTED_BANK_URL,
} from '@path/constants/constant';
import { RootState } from '@path/redux/stores/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SupportedBankModel {
  bank_code: string;
  bank_name: string;
  logo_link: string;
  bank_type: number;
  display_order: 1;
}
export interface SupportedBankState {
  status: string;
  error: any;
  bankList: Array<SupportedBankModel>;
  isLoading: boolean;
}
const initialState: SupportedBankState = {
  status: 'idle',
  error: '',
  bankList: [],
  isLoading: false,
};
const SupportedBankSlice = createSlice({
  name: 'Payment',
  initialState,
  reducers: {
    getListSupportedBank: (state, action: PayloadAction<any>) => {
      state.isLoading = true;
    },

    getListSupportedBankSuccess: (state, action: PayloadAction<any>) => {
      //   state.bankList = action.payload.map((bank: any) => {
      //     const copiedBank = ... bank
      //     return copiedBank
      // } )
      state.bankList = action.payload.map((bank: any) => {
        bank.logo_link = bank.logo_link.replace(
          '~/images/bank',
          SUPPORTED_BANK_IMG,
        );
        return bank;
      });
      state.isLoading = false;
    },
    getListSupportedBankError: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
  },
});

export default SupportedBankSlice.reducer;
export const supportedBankActions = SupportedBankSlice.actions;
export const selectSupportedBankList = (state: RootState) =>
  state.supportedBank.bankList;
export const selectSupportedBankListWithType = (
  state: RootState,
  bankType: number,
) =>
  bankType === 1
    ? state.supportedBank.bankList.filter(
        (bank: any) => bank.bank_type === 1 || bank.bank_type === 2,
      )
    : state.supportedBank.bankList.filter(
        (bank: any) => bank.bank_type === bankType,
      );
