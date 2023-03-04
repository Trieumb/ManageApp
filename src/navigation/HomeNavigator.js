import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {
//   CustomerManager,
//   JobManager,
//   Timekeeping,
//   InventoryManager
// } from '../screens'
import CustomerManager from '../screens/customerManage';
import JobManager from '../screens/jobManager';
import Timekeeping from '../screens/timekeeping';
import InventoryManager from '../screens/inventoryManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, FONT_SIZE} from '../config/constants';

const HomeTab = createBottomTabNavigator();
const HomeNavigator = () => {
  return (
    <HomeTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'JobManager') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'CustomerManager') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'InventoryManager') {
            iconName = focused ? 'ios-help-circle' : 'ios-help-circle-outline';
          } else if (route.name === 'Timekeeping') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.DARKGRAY,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: FONT_SIZE.BODY,
        }
      })}
    >
      <HomeTab.Screen name="JobManager" component={JobManager} />
      <HomeTab.Screen name="CustomerManager" component={CustomerManager} />
      <HomeTab.Screen name="Timekeeping" component={Timekeeping} />
      <HomeTab.Screen name="InventoryManager" component={InventoryManager} />
    </HomeTab.Navigator>
  )
}

export default HomeNavigator