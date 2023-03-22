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

export const getInfoUserByIdThunk = createAsyncThunk(
  'user/getInfoUser',
  async (userId, thunkAPI) => {
    try {
      const res = await getUserInfoById(userId);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);
export const deleteUser = createAsyncThunk('user/deleteUser', async (userId) => {
  try {
      const res = await firebase.app().database(Api_URL).ref(`users/${userId}`).remove();
      return res;
  } catch (error) {
      console.log(error);
  }
});