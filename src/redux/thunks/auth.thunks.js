import {createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {
  loginWithEmail,
  logOut,
  signupWithEmail,
} from '../../config/api/AuthFirebase';
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const res = await loginWithEmail(data);
      const user = res.user;
      const userId = res.user?.uid;
      const resultData = {userId: userId, user: user};
      return resultData;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);
export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const res = await signupWithEmail(data);
      const user = res.user;
      const userId = res.user?.uid;
      const resultData = {userId: userId, user: user};
      return resultData;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await logOut();
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);
