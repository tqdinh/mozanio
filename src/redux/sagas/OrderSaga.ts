import { storage } from '@path/App';
import axiosClient from '@path/services/axiosClient';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { baseURL } from '../Apis/api';
import { orderActions } from '../Slices/OrderSlice';
import { RootState } from '../stores/store';
function* getOrderHistory(): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: '/orders/',
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      // console.log('get order history success');
      yield put(orderActions.getOrderHistorySuccess(res));
    } catch (error) {
      yield put(orderActions.getOrderHistoryError(error));
    }
  } else {
    yield put(orderActions.getOrderHistoryError('{token undefined}'));
  }
}

function* getMoreOrderHistory(): any {
  const state: RootState = yield select();
  const nextPage = state.order.payload.next;
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user && null != nextPage) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: nextPage,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(orderActions.getMoreOrderHistorySuccess(res));
    } catch (error) {
      yield put(orderActions.getMoreOrderHistoryError(error));
    }
  } else {
    yield put(orderActions.getMoreOrderHistoryError('{token undefined}'));
  }
}

function* getOrderDetail(action: PayloadAction<any>): any {
  const ref = action.payload;
  console.log('order detail:', ref);
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: `/orders/${ref}/`,
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(orderActions.getOrderDetailSuccess(res));
    } catch (error: any) {
      if (error.response) {
        console.log('getOrderDetail error');
        console.log(JSON.stringify(error.response.data));
        console.log(JSON.stringify(error.response.status));
      }
    }
  } else {
    yield put(orderActions.getOrderHistoryError('{token undefined}'));
  }
}
export default function* OrderSaga() {
  yield takeLatest(orderActions.getOrderHistory, getOrderHistory);
  yield takeLatest(orderActions.getMoreOrderHistory, getMoreOrderHistory);
  yield takeLatest(orderActions.getOrderDetail, getOrderDetail);
}
