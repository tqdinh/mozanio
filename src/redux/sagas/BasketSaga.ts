import { storage } from '@path/App';
import axiosClient from '@path/services/axiosClient';
import { UNPAID_ORDER_EXISTS } from '@path/utils/error';
import { PayloadAction } from '@reduxjs/toolkit';
import { any } from 'prop-types';
import { err } from 'react-native-svg/lib/typescript/xml';
import {
  call,
  fork,
  put,
  putResolve,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { baseURL } from '../Apis/api';
import { basketActions, ExtraConfig } from '../Slices/BasketSlice';
import { menuActions } from '../Slices/MenuSlice';
import { orderActions } from '../Slices/OrderSlice';
import { RootState } from '../stores/store';

function* getOrCreateBasket(): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: '/basket/',
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(basketActions.getOrCreateBasketSuccess(res));
    } catch (error) {
      yield put(basketActions.getOrCreateBasketError(error));
    }
  } else {
    yield put(basketActions.getOrCreateBasketError('{token undefined}'));
  }
}

function* addUserBasketItem(
  productId: number,
  productType: string,
  quantity: number,
  extra: ExtraConfig,
): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);

  let copiedExtra = { ...extra };
  copiedExtra.additional_items.map((e: any) => {
    if (null == e.additional_item?.thumbnail) {
      delete e.additional_item.thumbnail;
    }
    return e;
  });

  const dataPayload = {
    product_id: productId,
    product_type: productType,
    quantity: quantity,
    extra: copiedExtra,
  };

  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: '/basket/',
        baseURL: baseURL,
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        data: dataPayload,
      });
      yield put(basketActions.addUserBasketItemSuccess(res));
    } catch (error: any) {
      if (error.response) {
        console.log('Add basket item error ', error.response);
      }

      yield put(basketActions.addUserBasketItemError(error));
    }
  } else {
    yield put(basketActions.addUserBasketItemError('{token undefined}'));
  }
}
function* addUserBasketItemFlow(): any {
  while (true) {
    const addUserBasketItemAction = yield take(basketActions.addUserBasketItem);
    const { product_id, product_type, quantity, extra } =
      addUserBasketItemAction.payload;
    yield fork(addUserBasketItem, product_id, product_type, quantity, extra);
  }
}

function* removeUserBasketItem(ref: String): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: `/basket/${ref}/`,
        baseURL: baseURL,
        method: 'delete',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(basketActions.removeUserBasketItemSuccess(res));
    } catch (error) {
      yield put(basketActions.removeUserBasketItemError(error));
    }
  } else {
    yield put(basketActions.removeUserBasketItemError('{token undefined}'));
  }
}
function* removeUserBasketItemFlow(): any {
  while (true) {
    const removeUserBasketItemAction = yield take(
      basketActions.removeUserBasketItem,
    );
    const { ref } = removeUserBasketItemAction.payload;
    yield call(removeUserBasketItem, ref);
  }
}

function* updateUserBasketItem(ref: string, quantity: number): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: `/basket/${ref}/`,
        baseURL: baseURL,
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        data: {
          quantity: quantity,
        },
      });
      yield put(basketActions.updateUserBasketItemSuccess(res));
    } catch (error: any) {
      console.log('updateUserBasketItem', error.response);

      yield put(basketActions.updateUserBasketItemError(error));
    }
  } else {
    yield put(basketActions.updateUserBasketItemError('{token undefined}'));
  }
}
function* updateUserBasketItemFlow(): any {
  while (true) {
    const updateUserBasketItemAction = yield take(
      basketActions.updateUserBasketItem,
    );
    const { ref, quantity } = updateUserBasketItemAction.payload;
    yield fork(updateUserBasketItem, ref, quantity);
  }
}

function* addSameUserBasketItemWithDifferentConfig(
  productId: number,
  productType: string,
  quantity: number,
  ref: string,
  extra: ExtraConfig,
): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);

  let copiedExtra = { ...extra };
  copiedExtra.additional_items.map((e: any) => {
    if (null == e.additional_item?.thumbnail) {
      delete e.additional_item.thumbnail;
    }
    return e;
  });
  const dataPayload = {
    product_id: productId,
    product_type: productType,
    quantity: quantity,
    ref: ref,
    extra: copiedExtra,
  };
  console.log(
    'addSameUserBasketItemWithDifferentConfig payload',
    JSON.stringify(dataPayload),
  );

  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: '/basket/',
        baseURL: baseURL,
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        data: dataPayload,
      });
      console.log('ADD SAME BASKET ', res);
      yield put(
        basketActions.addSameUserBasketItemWithDifferentConfigSuccess(res),
      );
    } catch (error: any) {
      if (error.response)
        console.error(
          'addSameUserBasketItemWithDifferentConfig',
          error.response,
        );

      yield put(
        basketActions.addSameUserBasketItemWithDifferentConfigError(error),
      );
    }
  } else {
    yield put(
      basketActions.addSameUserBasketItemWithDifferentConfigError(
        '{token undefined}',
      ),
    );
  }
}
function* addSameUserBasketItemWithDifferentConfigFlow(): any {
  while (true) {
    const addUserBasketItemAction = yield take(
      basketActions.addSameUserBasketItemWithDifferentConfig,
    );
    const { product_id, product_type, quantity, ref, extra } =
      addUserBasketItemAction.payload;
    yield fork(
      addSameUserBasketItemWithDifferentConfig,
      product_id,
      product_type,
      quantity,
      ref,
      extra,
    );
  }
}
function* deleteBasket(): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: '/basket/',
        baseURL: baseURL,
        method: 'delete',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      //yield put(basketActions.deleteBasketSuccess(res));
      yield put(basketActions.getOrCreateBasket());
    } catch (error) {
      yield put(basketActions.deleteBasketError(error));
    }
  } else {
    yield put(basketActions.deleteBasketError('{token undefined}'));
  }
}

function* clearBasket(): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: '/basket/clear/',
        baseURL: baseURL,
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(basketActions.clearBasketSuccess(res));
    } catch (error) {
      yield put(basketActions.clearBasketError(error));
    }
  } else {
    yield put(basketActions.clearBasketError('{token undefined}'));
  }
}

function* getMemuItemDetail(
  action: PayloadAction<{ branchId: string; itemId: number }>,
): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: `/branches/${action.payload.branchId}/menu/?item=${action.payload.itemId}&size_config=true&ingredients=true&additional_items=true`,
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(menuActions.getMemuItemDetailSuccess(res));
    } catch (error: any) {
      console.log('get detail error ', error.respone);

      yield put(menuActions.getMemuItemDetailError(error));
    }
  }
}

function* getDetailInfoOfProductThenAddToBasket(
  productId: number,
  productType: string,
  quantity: number,
  branchId: any,
): any {
  // const menuDetail = yield fork(menuActions.getMemuItemDetail, { branchId: branchId, itemId: productId })
  // console.log("-----------", menuDetail)

  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: `/branches/${branchId}/menu/?item=${productId}&size_config=true&ingredients=true&additional_items=true`,
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });

      const detailItem = res;
      const sizeId = detailItem.default_size;
      const defaultSize = detailItem.size_config.find(
        (e: any) => e.id === sizeId,
      );
      const additionalItems = detailItem.additional_items.map((e: any) => {
        if (null == e.additional_item?.thumbnail) {
          delete e.additional_item.thumbnail;
        }
        return { ...e, amount: e.min_value };
      });

      const extraInfo = {
        size_config: {
          id: defaultSize.id,
          size: defaultSize.size,
          branch_price: defaultSize.branch_price,
        },
        additional_items: additionalItems,
      };

      yield fork(
        addUserBasketItem,
        productId,
        productType,
        quantity,
        extraInfo,
      );
    } catch (error: any) {
      console.log('get detail error ', error.respone);
    }
  }
}

function* addUserBasketItemWithDefaulConfigFlow(): any {
  while (true) {
    const addUserBasketItemAction = yield take(
      basketActions.addUserBasketItemWithDefaulConfig,
    );
    const { product_id, product_type, quantity, branchId } =
      addUserBasketItemAction.payload;
    yield fork(
      getDetailInfoOfProductThenAddToBasket,
      product_id,
      product_type,
      quantity,
      branchId,
    );
  }
}

export default function* BasketSaga() {
  yield takeLatest(basketActions.getOrCreateBasket, getOrCreateBasket);
  yield takeLatest(basketActions.deleteBasket, deleteBasket);
  yield takeLatest(basketActions.clearBasket, clearBasket);

  yield fork(addUserBasketItemFlow);
  yield fork(updateUserBasketItemFlow);
  yield fork(removeUserBasketItemFlow);
  yield fork(addSameUserBasketItemWithDifferentConfigFlow);

  yield fork(addUserBasketItemWithDefaulConfigFlow);
}
