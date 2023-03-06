import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomerManager from '../screens/customerManage';
import JobManager from '../screens/jobManager';
import Timekeeping from '../screens/timekeeping';
import InventoryManager from '../screens/inventoryManager';
import UserManager from '../screens/userManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../components/CustomDrawer';
import Colors from '../config/constants/Colors';
import FontSize from '../config/constants/FontSize';
import Fonts from '../config/constants/Fonts';

const HomeTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>} 
    screenOptions = { {headerShown: true,
      drawerActiveBackgroundColor: Colors.PRIMARY,
      drawerActiveTintColor: Colors.WHITE,
      drawerInactiveTintColor: Colors.BACKDROP,
      drawerLabelStyle:{
        marginLeft: 10,
        fontFamily: Fonts.POPPINS,
        fontSize: FontSize.BODY_18,
      },
    headerStyle: {
      backgroundColor: Colors.BG,
      elevation: 3,
      shadowOpacity: 0,
    }}}>
      <Drawer.Screen name="Công việc" component={JobManager} options={{
        drawerIcon: ({ color }) => {
          <Ionicons name='home-outline' size={20} color={color} />
        }
      }} />
      <Drawer.Screen name="Khách hàng" component={CustomerManager}
        options={{
          drawerIcon: ({ color }) => {
            <Ionicons name='home-outline' size={20} color={color} />
          }
        }} />
      <Drawer.Screen name="Kho" component={Timekeeping}
        options={{
          drawerIcon: ({ color }) => {
            <Ionicons name='home-outline' size={20} color={color} />
          }
        }} />
      <Drawer.Screen name="Chấm công" component={InventoryManager}
        options={{
          drawerIcon: ({ color }) => {
            <Ionicons name='home-outline' size={20} color={color} />
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