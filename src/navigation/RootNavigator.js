import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {isUserAuthenticatedSelector} from '../redux/selectors/auth.selector';


export default RootNavigator = () => {

  const {isSignedIn} = useSelector((state) => state.auth.isSignedIn)

  const authenticated = useSelector(isUserAuthenticatedSelector);
  console.log(authenticated);
  return (
    <NavigationContainer>
      {isSignedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

