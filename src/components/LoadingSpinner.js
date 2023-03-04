import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLORS} from '../config/constants';

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={COLORS.PRIMARY} />
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
