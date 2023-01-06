import { storage } from '@path/App';
import { baseURL } from '@path/redux/Apis/api';
import { verifyPasscodeActions } from '@path/redux/Slices/Pay/VerifyPasscodeSlice';
import axiosClient from '@path/services/axiosClient';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

function* VerifyPassCode(action: PayloadAction<any>): Object {
  const userString = storage.getString('user');
  console.log('VerifyPassCodeSaga:', action.payload);
  const user = userString == undefined ? undefined : JSON.parse(userString);

  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: '/customer/verify/',
        baseURL: baseURL,
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        data: {
          pass_code: action.payload,
        },
      });
      console.log('verify passcode success', res);
      yield put(verifyPasscodeActions.verifyPassCodeSuccess(res));
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
      }
      yield put(verifyPasscodeActions.verifyPassCodeError(error.response));
    }
  } else {
    console.error('User token invalid');
  }
}

function* VerifyPasscodeSaga() {
  yield takeLatest(verifyPasscodeActions.verifyPassCode, VerifyPassCode);
}
export default VerifyPasscodeSaga;
