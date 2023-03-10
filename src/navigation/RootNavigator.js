import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {isUserAuthenticatedSelector} from '../redux/selectors/auth.selector';


export default RootNavigator = () => {

  const authenticated = useSelector(isUserAuthenticatedSelector);
  return (
    <NavigationContainer>
      {authenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

