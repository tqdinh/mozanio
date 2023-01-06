import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../stores/store';
export interface BranchModel {
  id: string;
  vendor: string;
  name: string;
  display_name: string;
  images: Object | null;
  status: string;
  address: string;
  latitude: number;
  longitude: number;
  logo: {
    id: number;
    url: string;
  };
  created_time: string;
  updated_time: string;
}

export interface ListBranchState {
  count: number;
  next: string;
  previous: any;
  branchList: Array<BranchModel>;
  status: string;
  error: string;
  isLoading: boolean;
  branchItem: BranchModel | null;
}

const initialState: ListBranchState = {
  count: 0,
  next: '',
  previous: null,
  branchList: [],
  status: 'idle',
  error: '',
  isLoading: false,
  branchItem: null,
};
const BranchesSlice = createSlice({
  name: 'Branch',
  initialState,
  reducers: {
    getListBranch: state => {
      state.status = 'loading';
      state.count = 0;
      state.next = '';
      state.previous = null;
      state.branchList = [];
      state.isLoading = true;
    },
    getListBranchSuccess: (state, action: PayloadAction<any>) => {
      state.count = action.payload.count;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      state.status = 'succeeded';
      state.branchList = action.payload.results;
      state.isLoading = false;
    },
    getListBranchError: (state, action) => {
      state.error = 'error';
      state.status = 'failed';
    },
    getMoreListBranch: state => {
      state.status = 'loading';
    },
    getMoreListBranchSuccess: (state, action: PayloadAction<any>) => {
      state.status = 'succeeded';
      state.branchList = state.branchList.concat(action.payload.results);
      state.next = action.payload.next;
    },
    getBranchDetail: (state, action: PayloadAction<{ id: string }>) => {},
    getBranchDetailSuccess: (state, action: PayloadAction<BranchModel>) => {
      state.branchItem = action.payload;
    },
    getBranchDetailError: (state, action) => {},
  },
});

export default BranchesSlice.reducer;
export const branchesActions = BranchesSlice.actions;
export const selectAllBranchs = (state: RootState) => state.branch.branchList;
export const selectNextBranchPage = (state: RootState) => state.branch.next;
//export const selectBranchsBaseOnSearch = (state: RootState, searchString: string) => state.branch.branchList.filter((branch) => { branch.name.toLowerCase().includes(searchString.toLowerCase()) })
