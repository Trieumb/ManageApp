import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/auth.slice';
import usersSlice from './reducers/user.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
  },
});
