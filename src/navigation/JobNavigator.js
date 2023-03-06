import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobManager from '../screens/jobManager';
import { StyleSheet } from 'react-native';
import AddTask from '../screens/jobManager/AddTask';


const Tab = createBottomTabNavigator();

const JobNavigation = () => {
    return (
        <Tab.Navigator
        initialRouteName="SC"
        screenOptions={{
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        }}>
        <Tab.Screen name="Công việc" component={JobManager} />
        <Tab.Screen
          name="AddTask"
          component={AddTask}
          options={{headerTitle: 'AddTask'}}
        />
      </Tab.Navigator>
    )
}
export default JobNavigation;

const styles = StyleSheet.create({
    headerTitle: {

    }
})