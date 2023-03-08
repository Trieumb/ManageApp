import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Boarding from '../screens/boarding';
import SignUp from '../screens/signUp';
import SingIn from '../screens/signIn';
import ForgotPassword from '../screens/forgotPassword';

const AuthStack = createNativeStackNavigator();

export default AuthNavigation = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
              name="Boarding"
              component={Boarding}
              options={{ headerShown: false }}
            />
            <AuthStack.Screen
              name="SignIn"
              component={SingIn}
              options={{ headerShown: false }}
            />
            <AuthStack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <AuthStack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    )
}