import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/auth.slice';
//import {useSelector as rawUseSelector, TypedUseSelectorHook} from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

//export const useSelector = rawUseSelector;
