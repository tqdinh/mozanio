import { storage } from '@path/App';
import axiosClient from '@path/services/axiosClient';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { baseURL } from '../Apis/api';
import { menuActions, MenuItemByCategoriesPayload } from '../Slices/MenuSlice';
import { RootState } from '../stores/store';

function* getListMenu(vendorId: string): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: `/branches/${vendorId}/menu/`,
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(menuActions.getListMenuSuccess(res));
    } catch (error) {
      yield put(menuActions.getListMenuError(error));
    }
  }
}

function* getListMenuFlow(): any {
  while (true) {
    const listMenuAction = yield take(menuActions.getListMenu);
    const vendorId = listMenuAction.payload;
    yield fork(getListMenu, vendorId);
  }
}

function* getMoreListMenu(): any {
  const state: RootState = yield select();
  const nextPage = state.menu.currentListMenu.next;
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
            Authorization: 'Bearer ' + user.access,
          },
          data: {},
        });
        yield put(menuActions.getMoreListMenuSuccess(res));
      } catch (error) {
        yield put(menuActions.getListMenuError(error));
      }
    }
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

function* getListMenuItemByCategories(
  action: PayloadAction<MenuItemByCategoriesPayload>,
): Object {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: `/branches/${action.payload.branch_id}/menu/?services=${action.payload.service_categories}&categories=${action.payload.menu_categories}`,
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(menuActions.getListItemMenuByCategoriesSuccess(res));
      // console.log('getListMenuItemByCategories: ', res);
    } catch (error: any) {
      console.log('get detail error ', error.respone);

      yield put(menuActions.getListItemMenuByCategoriesFailure(error));
    }
  }
}
function* MenuSaga() {
  yield fork(getListMenuFlow);
  yield takeLatest(menuActions.getMoreListMenu, getMoreListMenu);
  yield takeLatest(menuActions.getMemuItemDetail, getMemuItemDetail);
  yield takeLatest(
    menuActions.getListItemMenuByCategories,
    getListMenuItemByCategories,
  );
}

export default MenuSaga;
