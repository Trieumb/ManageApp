import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Fonts from '../config/constants/Fonts';
import FontSize from '../config/constants/FontSize';
import { StyleSheet } from 'react-native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

export default RootNavigator = () => {
  return (
    <NavigationContainer>
        {true ? (<MainNavigator />) : (<AuthNavigator />)}
    </NavigationContainer>
  )
};
const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: FontSize.BODY_18,
  },
});

