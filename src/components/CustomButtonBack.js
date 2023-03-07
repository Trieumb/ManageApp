import React from 'react'
import { StyleSheet, Pressable, Text} from 'react-native';
import Colors from '../config/constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';


const CustomButtonBack = ({onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
        <Ionicons name="chevron-back-outline" size={30} color={Colors.PRIMARY}/>
    </Pressable>
  )
}

export default CustomButtonBack;
const styles = StyleSheet.create({
    button: {
      margin: 5,
    },
})