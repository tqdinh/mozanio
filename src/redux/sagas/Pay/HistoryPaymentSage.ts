import { storage } from '@path/App';
import { baseURL } from '@path/redux/Apis/api';
import { historyPaymentActions } from '@path/redux/Slices/Pay/HistoryPaymentSlice';
import { RootState } from '@path/redux/stores/store';
import axiosClient from '@path/services/axiosClient';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';

function* GetHistoryPayment(action: PayloadAction<any>): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    const limit = action.payload.limit;
    try {
      const res = yield call(axiosClient, {
        path: `/payments/?limit=${limit}`,
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(historyPaymentActions.getListHistoryPaymentSuccess(res));
    } catch (error: any) {
      console.log(error);
    }
  } else {
    console.error('User token invalid');
  }
}
function* GetMoreListHistoryPayment(): any {
  const state: RootState = yield select();
  const nextPage = state.historyPayment.next;
  if (null != nextPage) {
    const userString = storage.getString('user');
    const user = userString == undefined ? undefined : JSON.parse(userString);
    if (undefined !== user) {
      const accessToken = user.access;
      try {
        const res = yield call(axiosClient, {
          path: nextPage,
          method: 'get',
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        });
        yield put(historyPaymentActions.getMoreListHistoryPaymnetSuccess(res));
      } catch (error) {
        console.log('ERROR', error);
        // yield put(historyPaymentActions.getMoreListHistoryPaymnetError(error));
      }
    } else {
      // yield put(historyPaymentActions.getMoreListHistoryPaymnetError('undefined token'));
    }
  }
}
function* HistoryPaymentSaga() {
  yield takeLatest(
    historyPaymentActions.getListHistoryPayment,
    GetHistoryPayment,
  );
  yield takeLatest(
    historyPaymentActions.getMoreListHistoryPaymnet,
    GetMoreListHistoryPayment,
  );
}
export default HistoryPaymentSaga;
