import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';


import {
  loginThunk,
} from '../thunks/auth.thunks';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userUid: '',
    isSignedIn: false,
    isLoading: false,
    user: null,
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
        state.isSignedIn = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        if (action.payload) {
          console.log('first time sign in:  ', action.payload);
          state.isSignedIn = true;
        }
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = false;
        Alert.alert('Sign in failed', action.payload);
      });
  },
});

export default authSlice.reducer;
