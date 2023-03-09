import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

export default RootNavigator = () => {
  return (
    <NavigationContainer>
      {true ? (<MainNavigator />) : (<AuthNavigator />)}
    </NavigationContainer>
  );
};

