import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

import {loginThunk, signupThunk, logoutThunk} from '../thunks/auth.thunks';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userUid: '',
    isSignedIn: false,
    isLoading: false,
    user: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
        state.isSignedIn = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        if (action.payload) {
          console.log('first time sign in:  ', action.payload);
          state.userUid = action.payload.userId;
          state.user = action.payload.user;
          state.isSignedIn = true;
        }
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state, _) => {
        state.isLoading = false;
        state.isSignedIn = false;
      })

      .addCase(signupThunk.pending, state => {
        state.isLoading = true;
        state.isSignedIn = false;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        if (action.payload) {
          console.log('first time sign in:  ', action.payload);
          state.userUid = action.payload.userId;
          state.user = action.payload.user;
          state.isSignedIn = true;
        }
        state.isLoading = false;
      })
      .addCase(signupThunk.rejected, (state, _) => {
        state.isLoading = false;
        state.isSignedIn = false;
      })

      .addCase(logoutThunk.fulfilled, state => {
        state.isSignedIn = false;
        state.isLoading = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default authSlice;