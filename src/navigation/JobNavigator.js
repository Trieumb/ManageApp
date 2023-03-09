import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobManager from '../screens/jobManager';
import { StyleSheet } from 'react-native';
import AddTask from '../screens/jobManager/AddTask';
import Colors from '../config/constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontSize from '../config/constants/FontSize';


const Tab = createBottomTabNavigator();

const JobNavigation = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Công việc') {
                  iconName = focused
                      ? 'list-circle'
                      : 'list-circle-outline';
              } else if (route.name === 'Thêm') {
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
        <Tab.Screen name="Công việc" component={JobManager} />
        <Tab.Screen
          name="Thêm"
          component={AddTask}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    )
}
export default JobNavigation;

const styles = StyleSheet.create({
    headerTitle: {

    }
})