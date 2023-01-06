import { storage } from '@path/App';
import { getDataUser, setDataUser } from '@path/mmkv/mmkvStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../stores/store';

export interface SignInPayload {
  username: string;
  password: string;
}

interface AuthState {
  isLoggedIn: boolean;
  currentUser: any;
  isLoading: boolean;
  statusCode: number;
  isLoggedOut: boolean;
  logging?: boolean;
  isTokenRefreshed: boolean;
}
//
const initialState: AuthState = {
  isLoggedIn: false,
  currentUser: undefined,
  isLoading: false,
  statusCode: 0,
  isLoggedOut: true,
  logging: false,
  isTokenRefreshed: false,
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<SignInPayload>) {
      state.isLoggedIn = false;
      state.isLoading = true;
      state.isLoggedOut = true;
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<SignInPayload>) {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.currentUser = action.payload;
      setDataUser(action.payload);
      state.isLoggedOut = false;
      state.logging = false;
    },
    loginFailure(state, action: PayloadAction<number>) {
      state.logging = false;
      state.isLoggedIn = false;
      state.statusCode = action.payload;
      state.isLoading = false;
    },
    logout(state) {
      state.logging = false;
      state.isLoggedIn = false;
      storage.clearAll();
    },
    setLoggedInStateSucces(state) {
      state.logging = true;
      state.isLoggedIn = true;
      state.currentUser = undefined;
      state.isLoggedOut = !state.isLoggedOut;
    },
    refreshToken: () => {},
    refreshTokenSuccess: (state, action: PayloadAction<any>) => {
      // setAccessToken(action.payload.access);
      const user = getDataUser();
      user.token = action.payload.access;
      setDataUser(user);
      state.isTokenRefreshed = true;
    },
    refreshTokenFail() {},
  },
});

export const authAction = AuthSlice.actions;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLoggedOut = (state: RootState) => state.auth.isLoggedOut;
export default AuthSlice.reducer;
export const selectLatestLoginStatus = (state: RootState) =>
  state.auth.isTokenRefreshed;
