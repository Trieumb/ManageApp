import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {isUserAuthenticatedSelector} from '../redux/selectors/auth.selector';

import {checkLoginThunk} from '../redux/thunks/auth.thunks';
export default RootNavigator = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const authenticated = useSelector(isUserAuthenticatedSelector);
  useEffect(() => {
    dispatch(checkLoginThunk());
  }, []);

  return (
    <NavigationContainer>
      {isSignedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
