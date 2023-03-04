import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FONTS, FONT_SIZE } from '../config/constants';
import HomeNavigator from './HomeNavigator';
import {
  Boarding,
  SignIn,
  SignUp,
  ForgotPassword,
} from '../screens';

const RootStack = createNativeStackNavigator();

export default RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeNavigator'
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitle,
        }}>
        {true ? (
          <>
            <RootStack.Screen
              name="HomeNavigator"
              component={HomeNavigator}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="Boarding"
              component={Boarding}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="Signup"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: FONT_SIZE.BODY_18,
  },
});

