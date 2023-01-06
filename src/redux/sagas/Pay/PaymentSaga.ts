import { storage } from '@path/App';
import { baseURL } from '@path/redux/Apis/api';
import { paymentActions } from '@path/redux/Slices/Pay/PaymentSlice';
import axiosClient from '@path/services/axiosClient';
import { PayloadAction } from '@reduxjs/toolkit';
import { err } from 'react-native-svg/lib/typescript/xml';
import { call, put, takeLatest } from 'redux-saga/effects';

function* GetPaymentMethod(action: PayloadAction<any>) {}

function* GetPaymentStatus(action: PayloadAction<any>): Object {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);

  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: `/payments/${action.payload.id}/`,
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(paymentActions.getPaymentStatusSuccess(res));
    } catch (error: any) {
      yield put(paymentActions.requestPaymentError());
    }
  } else {
    console.error('User token invalid');
  }
}

function* RequestPayment(action: PayloadAction<any>): Object {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);

  console.log('RequestPayment:', action.payload);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: '/payment/',
        baseURL: baseURL,
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        data: {
          bank_code: action.payload.bank_code,
          locale: action.payload.locale,
          target_id: action.payload.target_id,
          target_type: action.payload.target_type,
          payment_method: action.payload.payment_method,
          amount: action.payload.amount,
          currency: action.payload.currency,
        },
      });
      yield put(paymentActions.requestPaymentSuccess(res));
    } catch (error: any) {
      if (error.response) {
        console.error('request payment error', error.response.status);
        console.error('request payment error', error.response.data);
      }

      yield put(paymentActions.requestPaymentError());
    }
  } else {
    console.error('User token invalid');
  }
}

function* PaymentSaga() {
  yield takeLatest(paymentActions.getPaymentMethod, GetPaymentMethod);
  yield takeLatest(paymentActions.getPaymentStatus, GetPaymentStatus);
  yield takeLatest(paymentActions.requestPayment, RequestPayment);
}
export default PaymentSaga;
