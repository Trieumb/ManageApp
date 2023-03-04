import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Colors from '../config/constants/Colors';

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={Colors.PRIMARY} />
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
