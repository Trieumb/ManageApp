import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import AddCustomer from '../screens/customerManage/AddCustomer';
import CustomerManager from '../screens/customerManage';
import Colors from '../config/constants/Colors';
import FontSize from '../config/constants/FontSize';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const CustomerNavigation = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Khách hàng') {
                  iconName = focused
                      ? 'list-circle'
                      : 'list-circle-outline';
              } else if (route.name === 'Thêm khách hàng') {
                  iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
              } 
              return <Ionicons name={iconName} size={size} color={color} />;   
          },
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarInactiveTintColor: Colors.DARKGRAY,
          headerShown: false,
          tabBarLabelStyle:{
              fontSize:FontSize.BODY,
          }
      })}>
        <Tab.Screen name="Khách hàng" component={CustomerManager} />
        <Tab.Screen
          name="Thêm khách hàng"
          component={AddCustomer}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    )
}
export default CustomerNavigation;

const styles = StyleSheet.create({
    headerTitle: {

    }
})