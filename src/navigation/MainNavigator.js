import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeNavigator from './HomeNavigator';
import AddTask from '../screens/jobManager/AddTask';
import CustomerNavigation from './CustomerNavigator';
import UpdateTask from '../screens/jobManager/UpdateTask';
import UpdateCustomer from '../screens/customerManage/UpdateCustomer';
import EditUser from '../screens/userManager/EditUser';

const MainStack = createNativeStackNavigator();

export default AuthNavigation = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="addTask"
        component={AddTask}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="UpdateTask"
        component={UpdateTask}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="CustomerNavigator"
        component={CustomerNavigation}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="UpdateCustomer"
        component={UpdateCustomer}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="EditUser"
        component={EditUser}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};
