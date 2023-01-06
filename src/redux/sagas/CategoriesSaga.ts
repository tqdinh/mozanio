import { getDataUser } from '@path/mmkv/mmkvStorage';
import axiosClient from '@path/services/axiosClient';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { baseURL } from '../Apis/api';
import {
  menuCategoriesAction,
  MenuCategoriesPayload,
} from '../Slices/Categories/MenuCategoriesSlice';
import { serviceCategoriesAction } from '../Slices/Categories/ServiceCategoriesSlice';

function* fetchDataMenuCategoriesList(
  payload: PayloadAction<MenuCategoriesPayload>,
): Object {
  const user = getDataUser();
  if (user !== undefined) {
    try {
      const res = yield call(axiosClient, {
        path: `/category/menu/?vendor=${payload.payload.vendor_id}`,
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + user.access,
        },
      });
      yield put(menuCategoriesAction.getListMenuCategoriesSucces(res));
    } catch (err) {
      console.log('get menu categories error: ', err);
    }
  }
}
function* fetchDataServiceCategoriesList(): Object {
  const user = getDataUser();
  if (user !== undefined) {
    try {
      const res = yield call(axiosClient, {
        path: `/category/service/`,
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + user.access,
        },
      });
      yield put(serviceCategoriesAction.getListServiceCategoriesSucces(res));
    } catch (err) {
      console.log('get service categories error: ', err);
    }
  }
}
function* categoriesSaga() {
  yield takeLatest(
    menuCategoriesAction.getListMenuCategories,
    fetchDataMenuCategoriesList,
  );
  yield takeLatest(
    serviceCategoriesAction.getListServiceCategories,
    fetchDataServiceCategoriesList,
  );
}

export default categoriesSaga;
