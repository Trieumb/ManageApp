import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InventoryManager from '../screens/inventoryManager';
import GoodsReceived from '../screens/inventoryManager/googdsReceived/GoodsReceived';
import GoodsDelivery from '../screens/inventoryManager/GoodsDelivery';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../config/constants/Colors';
import FontSize from '../config/constants/FontSize';


const Tab = createBottomTabNavigator();

const InventoryNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Kho') {
            iconName = focused
              ? 'warehouse'
              : 'warehouse';
          } else if (route.name === 'Nhập kho') {
            iconName = focused ? 'home-import-outline' : 'home-import-outline';
          } else if (route.name === 'Xuất kho') {
            iconName = focused ? 'home-export-outline' : 'home-export-outline';
          }
          return <IconMaterial name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.DARKGRAY,
        headerShown: false,
        tabBarStyle:{
          height: 60,
          backgroundColor: Colors.PRIMARY_100,
       },
        tabBarLabelStyle: {
          fontSize: FontSize.BODY,
        }
      })}>
      <Tab.Screen name="Kho" component={InventoryManager}/>
      <Tab.Screen
        name="Nhập kho"
        component={GoodsReceived}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Xuất kho"
        component={GoodsDelivery}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}
export default InventoryNavigation;
