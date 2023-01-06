import { storage } from '@path/App';
import axiosClient from '@path/services/axiosClient';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { baseURL } from '../Apis/api';
import {
  accountActions,
  AccountPayload,
  AccountStateInfo,
} from '../Slices/AccountSlice';

function* getAccountDetail(): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    const customerId = user.id;
    try {
      const res = yield call(axiosClient, {
        path: `/customer/${customerId}/`,
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(accountActions.getAccountDetailSuccess(res));
    } catch (error: any) {
      console.log('getAccountDetail');
      console.log(error.response.data);
      console.log(error.response.status);
      yield put(accountActions.getAccountDetailError(error));
    }
  }
}
function* updateAccountDetail(action: PayloadAction<AccountPayload>): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    const customerId = user.id;
    try {
      const res = yield call(axiosClient, {
        path: `/customer/${customerId}/`,
        baseURL: baseURL,
        method: 'patch',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        data: {
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          email: action.payload.email,
          national_code: action.payload.national_code,
          phone_number: action.payload.phone_number,
          avatar: action.payload.avatar,
          gender: action.payload.gender,
          date_of_birth: action.payload.date_of_birth,
        },
      });
      yield put(accountActions.updateAccountDetailSuccess(res));
      console.log('account update: ', res);
    } catch (error: any) {
      if (error.response) {
        console.log('updateAccountDetail');
        console.log(error.response.data);
        console.log(error.response.status);
      }
      yield put(accountActions.updateAccountDetailError(error));
    }
  }
}

export function* AccountSaga() {
  yield takeLatest(accountActions.getAccountDetail, getAccountDetail);
  yield takeLatest(accountActions.updateAccountDetail, updateAccountDetail);
}
