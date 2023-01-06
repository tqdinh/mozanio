import {
  CategoriesModal,
  EmptyMenuCategories,
  MenuCategoriesModal,
  ServiceCategoriesModal,
} from '@path/models/categories';
import { RootState } from '@path/redux/stores/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListServiceCategoriesState {
  currentListCategories: CategoriesModal;
  currentServiceCategories?: ServiceCategoriesModal;
}

const initialState: ListServiceCategoriesState = {
  currentListCategories: EmptyMenuCategories,
  currentServiceCategories: undefined,
};

export const ServiceCategoriesSlice = createSlice({
  name: 'ServiceCategories',
  initialState: initialState,
  reducers: {
    getListServiceCategories: () => {},
    getListServiceCategoriesSucces: (
      state,
      action: PayloadAction<CategoriesModal>,
    ) => {
      state.currentListCategories = action.payload;
    },
    getListServiceCategoriesFailure: () => {},
  },
});

//Actions
export const serviceCategoriesAction = ServiceCategoriesSlice.actions;
//Selectors
export const selectServiceCategories = (state: RootState) =>
  state.serviceCategories.currentListCategories;
//Reducers
export default ServiceCategoriesSlice.reducer;
