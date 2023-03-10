import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

import {writeUserThunk, getAllUsersThunk} from '../thunks/user.thunk';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(writeUserThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(writeUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          console.log('payload: ' + action.payload);
        }
      })
      .addCase(writeUserThunk.rejected, state => {
        state.isLoading = false;
      })
      .addCase(getAllUsersThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          console.log('payload: ', action.payload);
          state.users = action.payload.users;
        }
      })
      .addCase(getAllUsersThunk.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default usersSlice;
