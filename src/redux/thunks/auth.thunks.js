import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import {
  loginWithEmail,
} from '../../config/api/AuthFirebase';
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data) => {
    try {
      const res = await loginWithEmail(data);
      return res;
    } catch (error) {
      Alert.alert(error)
    }
  },
);



