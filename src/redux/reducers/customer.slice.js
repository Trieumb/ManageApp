import { createSlice } from '@reduxjs/toolkit';
import { saveCustomerData, fetchCustomers, deleteCustomer  } from '../thunks/customer.thunk';

const initialState = {
    customersData: [],
    isLoading: false,
    error: null,
};

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(saveCustomerData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(saveCustomerData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(saveCustomerData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchCustomers.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(fetchCustomers.fulfilled, (state, action) => {
          state.isLoading = false;
          state.customersData = action.payload;
        });
        builder.addCase(fetchCustomers.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
        builder.addCase(deleteCustomer.fulfilled, (state, action) => {
          state.isLoading = false;
        });
        builder.addCase(deleteCustomer.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    },
});

export default customersSlice;