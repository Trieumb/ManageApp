import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import LoadingSpinner from './LoadingSpinner';
import {COLORS} from '../constants';


const LoadingSpinner = ({size = 'large', color = COLORS.MAIN}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
