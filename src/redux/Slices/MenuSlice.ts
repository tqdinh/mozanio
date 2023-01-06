import { EmptyListMenu, ListMenuModal, MenuItemModal } from '@path/models/menu';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../stores/store';

export interface ListMenuCategoriesState {
  currentListMenu: ListMenuModal;
  currentItemMenu?: MenuItemModal;
  isLoading: boolean;
}
const initialState: ListMenuCategoriesState = {
  currentListMenu: EmptyListMenu,
  currentItemMenu: undefined,
  isLoading: false,
};
export interface MenuItemByCategoriesPayload {
  service_categories?: any;
  menu_categories?: any;
  branch_id: string;
}
const MenuSlice = createSlice({
  name: 'Menu',
  initialState: initialState,
  reducers: {
    getListMenu: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    getListMenuSuccess: (state, action: PayloadAction<any>) => {
      // state.status = 'success';
      state.currentListMenu.count = action.payload.count;
      state.currentListMenu.next = action.payload.next;
      state.currentListMenu.results = action.payload.results;
      state.isLoading = false;
    },
    getListMenuError: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    getMoreListMenu: state => {
      // state.status = 'loading';
    },
    getMoreListMenuSuccess: (state, action: PayloadAction<any>) => {
      // state.status = 'success';
      state.currentListMenu.count = action.payload.count;
      state.currentListMenu.next = action.payload.next;
      state.currentListMenu.results = state.currentListMenu.results.concat(
        action.payload.results,
      );
    },

    getMemuItemDetail: (state, action: PayloadAction<any>) => {
      state.isLoading = true;
      state.currentItemMenu = undefined;
    },
    getMemuItemDetailSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.currentItemMenu = action.payload;
    },
    getMemuItemDetailError: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    },

    clearLatestSelectedMenuItem: state => {
      state.currentItemMenu = undefined;
    },

    getListItemMenuByCategories: (
      state,
      action: PayloadAction<MenuItemByCategoriesPayload>,
    ) => {},
    getListItemMenuByCategoriesSuccess: (
      state,
      action: PayloadAction<ListMenuModal>,
    ) => {
      state.currentListMenu = action.payload;
    },
    getListItemMenuByCategoriesFailure: (
      state,
      action: PayloadAction<any>,
    ) => {},
  },
});

export default MenuSlice.reducer;
export const menuActions = MenuSlice.actions;
export const selectAllMenu = (state: RootState) => state.menu.currentListMenu;
export const selectNextMenuPage = (state: RootState) =>
  state.menu.currentListMenu.next;
export const selectCurrentSelectedMenuItem = (state: RootState) =>
  state.menu.currentItemMenu;
