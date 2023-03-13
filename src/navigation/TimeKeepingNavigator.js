import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Timekeeping from '../screens/timekeeping';
import DetaiEmployee from '../screens/timekeeping/DetaiEmployee';
import Colors from '../config/constants/Colors';
import FontSize from '../config/constants/FontSize';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const TimeKeepingNavigation = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Chấm công') {
                  iconName = focused
                      ? 'fingerprint'
                      : 'fingerprint';
              } else if (route.name === 'Chi tiết chấm công') {
                  iconName = focused ? 'account-details-outline' : 'account-details-outline';
              } 
              return <MaterialIcons name={iconName} size={size} color={color} />;   
          },
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarInactiveTintColor: Colors.DARKGRAY,
          tabBarStyle:{
            height: 60,
            backgroundColor: Colors.PRIMARY_100,
         },
          headerShown: false,
          tabBarLabelStyle:{
              fontSize:FontSize.BODY,
          }
      })}>
        <Tab.Screen name="Chấm công" component={Timekeeping} />
        <Tab.Screen
          name="Chi tiết chấm công"
          component={DetaiEmployee}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    )
}
export default TimeKeepingNavigation;
