import React from 'react'
import { StyleSheet, Pressable, Text} from 'react-native';
import Colors from '../config/constants/Colors';
import FontSize from '../config/constants/FontSize';
import Fonts from '../config/constants/Fonts';

const CustomButton = ({children, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

export default CustomButton;
const styles = StyleSheet.create({
    button: {
      backgroundColor: Colors.PRIMARY,
      borderRadius:8,
      width: "20%",
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      margin: 5,
    },
    text: {
      color: Colors.WHITE,
      fontSize: FontSize.BODY,
      fontFamily: Fonts.POPPINS,
    }
})