import axiosClient from '@path/services/axiosClient';
import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { baseURL } from '../Apis/api';
import { branchesActions } from '../Slices/BranchesSlice';
import { storage } from '@path/App';
import { RootState } from '../stores/store';
import { PayloadAction } from '@reduxjs/toolkit';
function* getListBranch(): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: '/branches/',
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(branchesActions.getListBranchSuccess(res));
    } catch (error) {
      console.log('ERROR', error);
      yield put(branchesActions.getListBranchError(error));
    }
  } else {
    yield put(branchesActions.getListBranchError('undefined token'));
  }
}

function* getMoreListBranch(): any {
  const state: RootState = yield select();
  const nextPage = state.branch.next;
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
        yield put(branchesActions.getMoreListBranchSuccess(res));
      } catch (error) {
        console.log('ERROR', error);
        yield put(branchesActions.getListBranchError(error));
      }
    } else {
      yield put(branchesActions.getListBranchError('undefined token'));
    }
  }
}
function* getBranchDetail(action: PayloadAction<{ id: string }>): any {
  const userString = storage.getString('user');
  const user = userString == undefined ? undefined : JSON.parse(userString);
  if (undefined !== user) {
    const accessToken = user.access;
    try {
      const res = yield call(axiosClient, {
        path: `/branches/${action.payload.id}/`,
        baseURL: baseURL,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      yield put(branchesActions.getBranchDetailSuccess(res));
    } catch (error) {
      console.log('ERROR', error);
      yield put(branchesActions.getListBranchError(error));
    }
  } else {
    yield put(branchesActions.getListBranchError('undefined token'));
  }
}
function* BranchSaga() {
  yield takeLatest(branchesActions.getListBranch, getListBranch);
  // yield fork(getMoreBranchFlow);
  yield takeLatest(branchesActions.getMoreListBranch, getMoreListBranch);
  yield takeLatest(branchesActions.getBranchDetail, getBranchDetail);
}

export default BranchSaga;
