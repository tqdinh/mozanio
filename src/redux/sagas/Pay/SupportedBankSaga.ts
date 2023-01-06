import { SUPPORTED_BANK_URL } from '@path/constants/constant';
import { supportedBankActions } from '@path/redux/Slices/Pay/SupportedBankSlice';
import axiosClient from '@path/services/axiosClient';
import { PayloadAction } from '@reduxjs/toolkit';
import { err } from 'react-native-svg/lib/typescript/xml';
import { call, put, takeLatest } from 'redux-saga/effects';
const qs = require('qs');
function* GetListSupportedBank(action: PayloadAction<any>): any {
  const tmnCode = action.payload;
  try {
    const res = yield call(axiosClient, {
      path: SUPPORTED_BANK_URL,
      method: 'post',
      // headers: {
      //   Authorization: 'Bearer ' + accessToken,
      // },
      // data: dataPayload,

      data: qs.stringify({
        tmn_code: tmnCode,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    yield put(supportedBankActions.getListSupportedBankSuccess(res));
  } catch (error: any) {
    if (error.response) {
      console.error('Bank error', JSON.stringify(error.response));
    }
  }
}

export function* SupportedBank() {
  yield takeLatest(
    supportedBankActions.getListSupportedBank,
    GetListSupportedBank,
  );
}
