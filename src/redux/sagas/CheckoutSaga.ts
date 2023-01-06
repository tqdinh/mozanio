import { storage } from '@path/App';
import axiosClient from '@path/services/axiosClient';
import { err } from 'react-native-svg/lib/typescript/xml';
import {
  call,
  fork,
  put,
  putResolve,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { baseURL } from '../Apis/api';
import { basketActions } from '../Slices/BasketSlice';
import { checkoutActions } from '../Slices/CheckoutSlice';
import { orderActions } from '../Slices/OrderSlice';
import { paymentActions } from '../Slices/Pay/PaymentSlice';

function* createCheckout(
  email: string,
  shippingAddress: string,
  billingAddress: string,
  paymentMethod: string,
): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: '/checkout/',
        baseURL: baseURL,
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        data: {
          email: email,
          shipping_address: shippingAddress,
          billing_address: billingAddress,
          payment_method: paymentMethod,
        },
      });
      const orderRes = yield call(axiosClient, {
        baseURL: res.url,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield putResolve(orderActions.getOrderByUrl(orderRes));
      yield putResolve(checkoutActions.createCheckoutSuccess(res));
      yield putResolve(basketActions.clearBasket());
    } catch (error: any) {
      yield put(
        checkoutActions.createCheckoutError(error.response.request.status),
      );
    }
  } else {
    yield put(checkoutActions.createCheckoutError('{token undefined}'));
  }
}
function* createCheckoutFlow(): any {
  while (true) {
    const createCheckoutAction = yield take(checkoutActions.createCheckout);
    const { email, shipping_address, billing_address, payment_method } =
      createCheckoutAction.payload;
    yield fork(
      createCheckout,
      email,
      shipping_address,
      billing_address,
      payment_method,
    );
  }
}
function* getCheckout(): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: '/checkout/',
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(checkoutActions.getCheckoutSuccess(res));
    } catch (error) {
      yield put(checkoutActions.getCheckoutError(error));
    }
  } else {
    yield put(checkoutActions.getCheckoutError('{token undefined}'));
  }
}
export default function* CheckoutSaga() {
  //yield takeLatest(checkoutActions.createCheckout, createCheckout)
  yield takeLatest(checkoutActions.getCheckout, getCheckout);
  yield fork(createCheckoutFlow);
}
