import createSagaMiddleware from '@redux-saga/core';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import myRootSaga from '../sagas/rootSaga';
import AccountSlice from '../Slices/AccountSlice';
import AuthSlice from '../Slices/AuthSlice';
import BasketSlice from '../Slices/BasketSlice';
import BranchSlice from '../Slices/BranchesSlice';
import MenuCategoriesSlice from '../Slices/Categories/MenuCategoriesSlice';
import ServiceCategoriesSlice from '../Slices/Categories/ServiceCategoriesSlice';
import CheckoutSlice from '../Slices/CheckoutSlice';
import MenuSlice from '../Slices/MenuSlice';
import OrderSlice from '../Slices/OrderSlice';
import CreatePasscodeSlice from '../Slices/Pay/CreatePasscodeSlice';
import HistoryPaymentSlice from '../Slices/Pay/HistoryPaymentSlice';
import PaymentSlice from '../Slices/Pay/PaymentSlice';
import SupportedBankSlice from '../Slices/Pay/SupportedBankSlice';
import VerifyPasscodeSlice from '../Slices/Pay/VerifyPasscodeSlice';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    branch: BranchSlice,
    menu: MenuSlice,
    basket: BasketSlice,
    checkout: CheckoutSlice,
    order: OrderSlice,
    account: AccountSlice,
    menuCategories: MenuCategoriesSlice,
    serviceCategories: ServiceCategoriesSlice,
    payment: PaymentSlice,
    supportedBank: SupportedBankSlice,
    createPasscode: CreatePasscodeSlice,
    verifyPasscode: VerifyPasscodeSlice,
    historyPayment: HistoryPaymentSlice,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});
sagaMiddleware.run(myRootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
