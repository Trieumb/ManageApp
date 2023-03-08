import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import Colors from '../config/constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../config/constants/Fonts';
import FontSize from '../config/constants/FontSize';

const HeaderCustom = () => {

    const navigation = useNavigation();
    const onBack = () => {
        navigation.goBack();
    }
  return (
    <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.buttonHeader}>
            <Ionicons name='chevron-back-outline' size={20} color={Colors.PRIMARY}/>
            <Text style={styles.subButton}>Thoát</Text>
        </Pressable>
    </View>
  )
}

export default HeaderCustom

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        paddingVertical: 20,
        height: "8%",
        backgroundColor: Colors.HEADER,
    },
    buttonHeader: {
        flexDirection: 'row'
    },
    subButton: {
        color: Colors.PRIMARY,
        fontSize: FontSize.BODY
    }
})