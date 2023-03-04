import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CustomerManager = () => {
  return (
    <View style={styles.container}>
      <Text>CustomerManager</Text>
    </View>
  )
}

export default CustomerManager

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  }
})