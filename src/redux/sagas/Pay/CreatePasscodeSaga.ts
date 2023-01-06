import { storage } from '@path/App';
import { baseURL } from '@path/redux/Apis/api';
import { accountActions } from '@path/redux/Slices/AccountSlice';
import { createPasscodeActions } from '@path/redux/Slices/Pay/CreatePasscodeSlice';
import axiosClient from '@path/services/axiosClient';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, putResolve, takeLatest } from 'redux-saga/effects';

function* CreatePassCode(action: PayloadAction<any>): Object {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);

  console.log('Set pass code', typeof action.payload);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: '/customer/set-pass-code/',
        baseURL: baseURL,
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        data: {
          pass_code: action.payload,
        },
      });
      console.log('Create passcode success', res);
      yield putResolve(createPasscodeActions.createPassCodeSuccess(res));
      yield putResolve(accountActions.getAccountDetail());
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
      }
      yield put(createPasscodeActions.createPassCodeError(error.response));
    }
  } else {
    console.error('User token invalid');
  }
}

function* CreatePasscodeSaga() {
  yield takeLatest(createPasscodeActions.createPassCode, CreatePassCode);
}
export default CreatePasscodeSaga;
