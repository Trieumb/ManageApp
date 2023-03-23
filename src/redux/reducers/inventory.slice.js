import {createSlice} from '@reduxjs/toolkit';
import {
  saveImportData,
  updateInventoryAfterImport,
  fetchInventoryThunk,
  writeImportSuppliesThunk,
  updateInventoryAfterExport,
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
    builder.addCase(saveImportData.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(saveImportData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.SuppliesData = action.payload;
      state.error = null;
    });
    builder.addCase(saveImportData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateInventoryAfterImport.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(updateInventoryAfterImport.fulfilled, (state, action) => {
      state.isLoading = false;
      suppliesSlice.caseReducers.updateInventorySuccess(state, action);
    });
    builder.addCase(updateInventoryAfterImport.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateInventoryAfterExport.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(updateInventoryAfterExport.fulfilled, (state, action) => {
      state.isLoading = false;
      suppliesSlice.caseReducers.updateInventorySuccess(state, action);
    });
    builder.addCase(updateInventoryAfterExport.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

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
