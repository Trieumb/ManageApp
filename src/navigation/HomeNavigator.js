import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Timekeeping from '../screens/timekeeping';
import UserManager from '../screens/userManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconMeterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontisso from 'react-native-vector-icons/Fontisto'
import CustomDrawer from '../components/CustomDrawer';
import Colors from '../config/constants/Colors';
import FontSize from '../config/constants/FontSize';
import Fonts from '../config/constants/Fonts';
import JobNavigation from './JobNavigator';
import CustomerNavigation from './CustomerNavigator';
import InventoryNavigation from './InventoryNavigator';

const HomeTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: Colors.PRIMARY,
        drawerActiveTintColor: Colors.WHITE,
        drawerInactiveTintColor: Colors.BACKDROP,
        drawerLabelStyle: {
          marginLeft: 5,
          fontFamily: Fonts.POPPINS,
          fontSize: FontSize.BODY_18,
        },
        headerStyle: {
          backgroundColor: Colors.HEADER,
          elevation: 3,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: Colors.PRIMARY,
          fontFamily: Fonts.POPPINS,
          fontSize: FontSize.H5
        },
      }}>
      <Drawer.Screen name="Kế hoạch công việc" component={JobNavigation} options={{
        drawerIcon: ({ color }) => {
          <Ionicons name='home-outline' size={20} color={color} />
        }
      }} />
      <Drawer.Screen name="Quản lý khách hàng" component={CustomerNavigation}
        options={{
          drawerIcon: ({ color }) => {
            <IconFontisso name='persons' size={20} color={color} />
          }
        }} />
      <Drawer.Screen name="Quản lý kho" component={InventoryNavigation}
        options={{
          drawerIcon: ({ color }) => {
            <IconMeterial name='warehouse' size={20} color={color} />
          }
        }} />
      <Drawer.Screen name="Chấm công" component={Timekeeping}
        options={{
          drawerIcon: ({ color }) => {
            <Ionicons name='finger-print' size={20} color={color} />
          }
        }} />
      <Drawer.Screen name="Tài khoản" component={UserManager}
        options={{
          drawerIcon: ({ color }) => {
            <Ionicons name='person-outline' size={20} color={color} />
          }
        }} />
    </Drawer.Navigator>
  )
}

export default HomeNavigator