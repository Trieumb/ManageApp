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
      width: "50%",
      borderRadius:8,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    text: {
      color: Colors.WHITE,
      fontSize: FontSize.H5,
      fontFamily: Fonts.POPPINS,
    }
})