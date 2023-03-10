import {createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {
  getUserInfoById,
  getAllUsers,
  writeUserData,
} from '../../config/api/UsersAPI';
export const writeUserThunk = createAsyncThunk(
  'user/write_data',
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const res = await writeUserData(data);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);

export const getAllUsersThunk = createAsyncThunk(
  'user/get_users',
  async (_, thunkAPI) => {
    try {
      const res = await getAllUsers();
      console.log('res:', res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);
