import { RootState } from '@path/redux/stores/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PasscodeState {
  status: string;
  isLoading: boolean;
}
const initialState: PasscodeState = {
  status: 'idle',
  isLoading: false,
};
export const VerifyPasscodeSlice = createSlice({
  name: 'Passcode',
  initialState,
  reducers: {
    verifyPassCode: (state, action: PayloadAction<any>) => {
      state.status = 'idle';
      state.isLoading = true;
    },
    verifyPassCodeSuccess: (state, action: PayloadAction<any>) => {
      state.status = 'success';
      state.isLoading = false;
    },
    verifyPassCodeError: (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.isLoading = false;
    },
    refreshVerifyPassCodeStatus: state => {
      state.status = 'idle';
      state.isLoading = false;
    },
  },
});

export default VerifyPasscodeSlice.reducer;
export const verifyPasscodeActions = VerifyPasscodeSlice.actions;
export const selectLoadingState = (state: RootState) =>
  state.verifyPasscode.isLoading;
export const selectStatusState = (state: RootState) =>
  state.verifyPasscode.status;
