import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Fonts from '../config/constants/Fonts';
import FontSize from '../config/constants/FontSize';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

import {isUserAuthenticatedSelector} from '../redux/selectors/auth.selector';

export default RootNavigator = () => {
  const authenticated = useSelector(isUserAuthenticatedSelector);

  return (
    <NavigationContainer>
      {authenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: FontSize.BODY_18,
  },
});
