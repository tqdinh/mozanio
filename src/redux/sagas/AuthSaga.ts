import { storage } from '@path/App';
import axiosClient from '@path/services/axiosClient';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { baseURL } from '../Apis/api';
import { authAction, SignInPayload } from '../Slices/AuthSlice';

function* handleLogin(action: PayloadAction<SignInPayload>): any {
  try {
    const res = yield call(axiosClient, {
      path: '/guest/login/',
      baseURL: baseURL,
      method: 'post',
      data: {
        username: action.payload.username,
        password: action.payload.password,
      },
    });
    yield put(authAction.loginSuccess(res));
  } catch (error: any) {
    console.log('ERROR', error.response.request.status);
    yield put(authAction.loginFailure(error.response.request.status));
  }
}
function* handleRefreshToken(): any {
  console.log('Call refreshToken');
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    const refreshToken = user.refresh;
    // console.log(accessToken);
    // console.log('................');
    // console.log(refreshToken);
    try {
      const res = yield call(axiosClient, {
        path: `/refresh-token/`,
        baseURL: baseURL,
        method: 'post',
        data: {
          access: accessToken,
          refresh: refreshToken,
        },
      });
      yield put(authAction.refreshTokenSuccess(res));
      console.log('refresh token', res);
    } catch (error: any) {
      console.log('refresh error', error);
      if (error.response) {
        console.log('Refresh token error');
        console.log(error.response.data);
        console.log(error.response.status);
        yield put(authAction.logout());
      }
    }
  } else {
    yield put(authAction.logout());
  }
}

function* AuthSaga() {
  yield takeLatest(authAction.login, handleLogin);
  yield takeLatest(authAction.refreshToken, handleRefreshToken);
}

export default AuthSaga;
