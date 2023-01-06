import { RootState } from '@path/redux/stores/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CreatePasscodeState {
  status: string;
  isLoading: boolean;
}
const initialState: CreatePasscodeState = {
  status: 'idle',
  isLoading: false,
};
export const CreatePasscodeSlice = createSlice({
  name: 'Passcode',
  initialState,
  reducers: {
    createPassCode: (state, action: PayloadAction<any>) => {
      state.status = 'loading';
      state.isLoading = true;
    },
    createPassCodeSuccess: (state, action: PayloadAction<any>) => {
      state.status = 'success';
      state.isLoading = false;
    },
    createPassCodeError: (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.isLoading = false;
    },
    refreshPassCodeStatus: state => {
      state.status = 'idle';
      state.isLoading = false;
    },
  },
});

export default CreatePasscodeSlice.reducer;
export const createPasscodeActions = CreatePasscodeSlice.actions;
export const selectLoadingState = (state: RootState) =>
  state.createPasscode.isLoading;
export const selectCreatePasscodeStatus = (state: RootState) =>
  state.createPasscode.status;
