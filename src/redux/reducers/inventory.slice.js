import {createSlice} from '@reduxjs/toolkit';
import {
  fetchInventoryThunk,
  writeImportSuppliesThunk,
  writeExportSuppliesThunk,
} from '../thunks/inventory.thunk';

const initialState = {
  SuppliesData: {},
  inventory: [],
  isLoading: false,
  error: null,
};

const suppliesSlice = createSlice({
  name: 'supplies',
  initialState,
  reducers: {
    updateInventorySuccess(state, action) {
      state.inventory = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(writeImportSuppliesThunk.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(writeImportSuppliesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inventory = action.payload;
    });
    builder.addCase(writeImportSuppliesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(writeExportSuppliesThunk.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(writeExportSuppliesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inventory = action.payload;
    });
    builder.addCase(writeExportSuppliesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchInventoryThunk.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchInventoryThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inventory = action.payload;
    });
    builder.addCase(fetchInventoryThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default suppliesSlice;
