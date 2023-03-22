import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '@react-native-firebase/database';
import Api_URL from '../../config/api/Api_URL';

export const saveCustomerData = createAsyncThunk(
    'customer/saveCustomerData',
    async (data, { rejectWithValue }) => {
        try {
            await firebase.app().database(Api_URL).ref('customers').push(data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const updateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async ( {customerId, data}, thunkAPI) => {
      try {
        await firebase.app().database(Api_URL).ref(`customers/${customerId}`).update(data);
        console.log("đã cập nhật khách hàng!");
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    },
  );
export const fetchCustomers = createAsyncThunk('customers/fetchCustomer', async () => {
    try {
        const snapshot = await firebase.app().database(Api_URL).ref('customers').once('value');
        const data = snapshot.val();
        const customers = Object.keys(data || {}).map((key) => ({ id: key, ...data[key] }));
        return customers;
    } catch (error) {
        console.log(error);
    }
});

export const deleteCustomer = createAsyncThunk('customer/deleteCustomer', async (id) => {
    try {
        const res = await firebase.app().database(Api_URL).ref(`customers/${id}`).remove();
        return res;
    } catch (error) {
        console.log(error);
    }
});
export const searchCustomers = createAsyncThunk(
    'customers/search',
    async (query) => {
      const ref = firebase.app().database(Api_URL).ref('customers');
      const snapshot = await ref.orderByChild('name').startAt(query).endAt(`${query}\uf8ff`).once('value');
      const customers = [];
      snapshot.forEach((child) => {
        customers.push({
          id: child.key,
          ...child.val(),
        });
      });
      return customers;
    }
  );