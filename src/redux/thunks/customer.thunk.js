import {createAsyncThunk} from '@reduxjs/toolkit';
import {firebase} from '@react-native-firebase/database';
import Api_URL from '../../config/api/Api_URL';

export const saveCustomerData = createAsyncThunk(
  'jobs/saveCustomerData',
  async (data, {rejectWithValue}) => {
    try {
      await firebase
        .app()
        .database(Api_URL)
        .ref('customers')
        .push({value: data});
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomer',
  async () => {
    try {
      const snapshot = await firebase
        .app()
        .database(Api_URL)
        .ref('customers')
        .once('value');
      const data = snapshot.val();
      const customers = Object.keys(data || {}).map(key => ({
        id: key,
        ...data[key],
      }));
      return customers;
    } catch (error) {
      console.log(error);
    }
  },
);

export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async id => {
    try {
      const res = await firebase
        .app()
        .database(Api_URL)
        .ref(`customers/${id}`)
        .remove();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
);
