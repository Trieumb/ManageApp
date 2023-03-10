import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Timekeeping from '../screens/timekeeping';
import UserManager from '../screens/userManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontisso from 'react-native-vector-icons/Fontisto';
import CustomDrawer from '../components/CustomDrawer';
import Colors from '../config/constants/Colors';
import FontSize from '../config/constants/FontSize';
import Fonts from '../config/constants/Fonts';
import JobNavigation from './JobNavigator';
import CustomerNavigation from './CustomerNavigator';
import InventoryNavigation from './InventoryNavigator';

const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
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
          backgroundColor: Colors.BG,
          elevation: 3,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: Colors.PRIMARY,
          fontFamily: Fonts.POPPINS,
          fontSize: FontSize.H5,
        },
      }}>
      <Drawer.Screen
        name="Quản lý công việc"
        component={JobNavigation}
      />
      <Drawer.Screen
        name="Quản lý khách hàng"
        component={CustomerNavigation}
       
      />
      <Drawer.Screen
        name="Quản lý kho"
        component={InventoryNavigation}
       
      />
      <Drawer.Screen
        name="Chấm công"
        component={Timekeeping}
       
      />
      <Drawer.Screen
        name="Tài khoản"
        component={UserManager}
       
      />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;
