import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomerManager from '../screens/customerManage';
import JobManager from '../screens/jobManager';
import Timekeeping from '../screens/timekeeping';
import InventoryManager from '../screens/inventoryManager';
import UserManager from '../screens/userManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../config/constants/Colors';
import FontSize from '../config/constants/FontSize';

const HomeTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Công việc') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Khách hàng') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Kho') {
            iconName = focused ? 'ios-help-circle' : 'ios-help-circle-outline';
          } else if (route.name === 'Chấm công') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === 'Tài khoản') {
          iconName = focused ? 'ios-list' : 'ios-list-outline';
        }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.DARKGRAY,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: FontSize.BODY,
        }
      })}
    >
      <Drawer.Screen name="Công việc" component={JobManager} />
      <Drawer.Screen name="Khách hàng" component={CustomerManager} />
      <Drawer.Screen name="Kho" component={Timekeeping} />
      <Drawer.Screen name="Chấm công" component={InventoryManager} />
      <Drawer.Screen name="Tài khoản" component={UserManager} />
    </Drawer.Navigator>
  )
}

export default HomeNavigator