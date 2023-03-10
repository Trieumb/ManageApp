import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/auth.slice';
import jobSlice from './reducers/job.slice';
import usersSlice from './reducers/user.slice';
//import {useSelector as rawUseSelector, TypedUseSelectorHook} from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    jobs: jobSlice.reducer,
    users: usersSlice.reducer,
  },
});
 export default store
//export const useSelector = rawUseSelector;
