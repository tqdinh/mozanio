import {
  CategoriesModal,
  EmptyMenuCategories,
  MenuCategoriesModal,
} from '@path/models/categories';
import { RootState } from '@path/redux/stores/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListMenuCategoriesState {
  currentListCategories: CategoriesModal;
  currentMenuCategories?: MenuCategoriesModal;
}

const initialState: ListMenuCategoriesState = {
  currentListCategories: EmptyMenuCategories,
  currentMenuCategories: undefined,
};

export interface MenuCategoriesPayload {
  vendor_id: string;
}

export const MenuCategoriesSlice = createSlice({
  name: 'MenuCategories',
  initialState: initialState,
  reducers: {
    getListMenuCategories: (
      state,
      action: PayloadAction<MenuCategoriesPayload>,
    ) => {},
    getListMenuCategoriesSucces: (
      state,
      action: PayloadAction<CategoriesModal>,
    ) => {
      state.currentListCategories = action.payload;
    },
    getListMenuCategoriesFailure: () => {},
  },
});

//Actions
export const menuCategoriesAction = MenuCategoriesSlice.actions;
//Selectors
export const selectMenuCategories = (state: RootState) =>
  state.menuCategories.currentListCategories;
//Reducers
export default MenuCategoriesSlice.reducer;
