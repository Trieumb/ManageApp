import {createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {
  getLoginStatus,
  loginWithEmail,
  logOut,
  signupWithEmail,
} from '../../config/api/AuthFirebase';
export const checkLoginThunk = createAsyncThunk(
  'auth/check_login',

  async (_, thunkAPI) => {
    try {
      let p = new Promise((resolve, reject) => {
        getLoginStatus(res => {
          if (res) {
            userId = res.uid;
          } else {
            userId = null;
          }

          return resolve(userId);
        });
      });

      let userId = await p;
      return {userId};
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const res = await loginWithEmail(data);
      const userId = res.user?.uid;
      const resultData = {userId: userId, user: user};
      console.log(user);
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
      const userId = res.user?.uid;
      const resultData = {userId};
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
