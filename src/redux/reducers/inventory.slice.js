import { createSlice } from '@reduxjs/toolkit';
import { saveImportData , fetchSupplies  } from '../thunks/inventory.thunk';

const initialState = {
    SuppliesData: [],
    isLoading: false,
    error: null,
};

const suppliesSlice = createSlice({
    name: 'supplies',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(saveImportData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(saveImportData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(saveImportData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchSupplies.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(fetchSupplies.fulfilled, (state, action) => {
          state.isLoading = false;
          state.customersData = action.payload;
        });
        builder.addCase(fetchSupplies.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    },
});

export default suppliesSlice;