import { SupportedGender } from '@path/models/enums/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { any } from 'prop-types';
import { RootState } from '../stores/store';

export interface AccountStateInfo {
  id: string;
  last_login: any;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  date_joined: any;
  national_code: any;
  status: string;
  updated_time: any;
  created_time: any;
  phone_number: string;
  avatar: any;
  wallet: any;
  membership: any;
  had_pass_code: boolean;
  gender: SupportedGender;
  date_of_birth: any;
}
interface AccountState {
  accountInfo: AccountStateInfo;
  status: string;
}
export interface AccountPayload {
  first_name: string;
  last_name: string;
  email: string;
  national_code: number;
  phone_number: string;
  avatar: any;
  gender: string;
  date_of_birth: any;
}
const initialState: AccountState = {
  status: 'idle',
  accountInfo: {
    id: '',
    last_login: undefined,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    is_active: false,
    date_joined: null,
    national_code: undefined,
    status: '',
    updated_time: null,
    created_time: null,
    phone_number: '',
    avatar: undefined,
    wallet: {},
    membership: null,
    had_pass_code: false,
    gender: SupportedGender.NOT_DEFINED,
    date_of_birth: null,
  },
};
const AccountSlice = createSlice({
  name: 'Account',
  initialState,
  reducers: {
    getAccountDetail(state) {
      state.status = 'loading';
    },
    getAccountDetailSuccess(state, action: PayloadAction<any>) {
      state.status = 'success';
      state.accountInfo = action.payload;
    },
    getAccountDetailError(state, action: PayloadAction<any>) {
      state.status = 'error';
    },
    updateAccountDetail(state, action: PayloadAction<AccountPayload>) {},
    updateAccountDetailSuccess(state, action: PayloadAction<AccountStateInfo>) {
      state.accountInfo = action.payload;
    },
    updateAccountDetailError(state, action: PayloadAction<any>) {},
  },
});

export const accountActions = AccountSlice.actions;
export default AccountSlice.reducer;
export const selectAccountInfo = (state: RootState) =>
  state.account.accountInfo;

export const selectPhoneNumberAccountInfo = (state: RootState) =>
  state.account.accountInfo.phone_number;
