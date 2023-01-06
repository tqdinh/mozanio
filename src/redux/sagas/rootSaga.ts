import { all } from 'redux-saga/effects';
import { AccountSaga } from './AccountSaga';
import AuthSaga from './AuthSaga';
import BasketSaga from './BasketSaga';
import BranchSaga from './BranchSaga';
import categoriesSaga from './CategoriesSaga';
import CheckoutSaga from './CheckoutSaga';
import MenuSaga from './MenuSaga';
import OrderSaga from './OrderSaga';
import CreatePasscodeSaga from './Pay/CreatePasscodeSaga';
import HistoryPaymentSaga from './Pay/HistoryPaymentSage';
import PaymentSaga from './Pay/PaymentSaga';
import { SupportedBank } from './Pay/SupportedBankSaga';
import VerifyPasscodeSaga from './Pay/VerifyPasscodeSaga';
import { SearchMenuDetailSaga } from './Search/SearchMenuDetailSaga';
export default function* myRootSaga() {
  yield all([
    AuthSaga(),
    BranchSaga(),
    MenuSaga(),
    BasketSaga(),
    CheckoutSaga(),
    OrderSaga(),
    AccountSaga(),
    categoriesSaga(),
    PaymentSaga(),
    SupportedBank(),
    CreatePasscodeSaga(),
    VerifyPasscodeSaga(),
    SearchMenuDetailSaga(),
    HistoryPaymentSaga(),
  ]);
}
