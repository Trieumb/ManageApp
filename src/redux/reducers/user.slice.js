import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

import {writeUserThunk, getAllUsersThunk} from '../thunks/user.thunk';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    editingUser: null,
    isDataWritten: false,
    isLoading: false,
  },
  reducers: {
    startEditUser: (state, action) => {
      console.log(state);
      state.editingUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(writeUserThunk.pending, state => {
        state.isDataWritten = false;
        state.isLoading = true;
      })
      .addCase(writeUserThunk.fulfilled, (state, action) => {
        console.log('payload: ' + action.payload);
        const uid = action.payload.uid;
        const index = state.users.findIndex(user => user.uid === uid);
        if (index >= -1) {
          state.users[index] = action.payload;
        }
        state.editingUser = null;
        state.isDataWritten = true;
        state.isLoading = false;
      })
      .addCase(writeUserThunk.rejected, state => {
        state.isDataWritten = false;
        state.isLoading = false;
      })
      .addCase(getAllUsersThunk.pending, state => {
        state.users = [];
        state.isLoading = true;
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.users = action.payload.users;
        }
        state.isLoading = false;
      })
      .addCase(getAllUsersThunk.rejected, state => {
        state.users = [];
        state.isLoading = false;
      });
  },
});
export const {startEditUser} = usersSlice.actions;
export default usersSlice;
