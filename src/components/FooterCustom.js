import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../config/constants/Colors';

const FooterCustom = () => {
  return (
    <View style={styles.footer}>
            </View>
  )
}

export default FooterCustom

const styles = StyleSheet.create({
    footer: {
        height: "8%",
        backgroundColor: Colors.HEADER,
    }
})