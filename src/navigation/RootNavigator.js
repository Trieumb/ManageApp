import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Fonts from '../config/constants/Fonts';
import FontSize from '../config/constants/FontSize';
import { StyleSheet } from 'react-native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

export default RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="HomeNavigator"
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitle,
        }}>
        {true ? (
          <>
            <RootStack.Screen
              name="HomeNavigator"
              component={HomeNavigator}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="addTask"
              component={AddTask}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="UpdateTask"
              component={UpdateTask}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="Boarding"
              component={Boarding}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="SignIn"
              component={SingIn}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Signup"
              component={SignUp}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
          </>
        )}
      </RootStack.Navigator>
        {true ? (<MainNavigator />) : (<AuthNavigator />)}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: FontSize.BODY_18,
  },
});
