import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  getUserInfoById,
  getAllUsers,
  writeUserData,
} from '../../config/api/UsersAPI';
export const writeUserThunk = createAsyncThunk(
  'user/write_data',
  async (data, thunkAPI) => {
    try {
      const res = await writeUserData(data);
      return res;
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
      return res;
    } catch (error) {
      console.log('getAllUsers error:', error.message);
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);
