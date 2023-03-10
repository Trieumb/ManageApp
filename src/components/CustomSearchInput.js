import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../config/constants/Colors';
import { WINDOW_WITH } from '../config/constants/DimensionsWindown';
import FontSize from '../config/constants/FontSize';
import LineHeight from '../config/constants/LineHeight';

const CustomSearchInput = () => {
    const [text, setText] = useState('');
  return (
    <View style={styles.container}>
        <Ionicons name='search' size={20} color={Colors.PRIMARY}/> 
        <TextInput style={styles.inputSearch}
            value={text}
            onChangeText={setText}
          placeholder="Tìm kiếm"/>
    </View>
  )
}

export default CustomSearchInput

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 40,
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: Colors.PRIMARY,
        borderRadius: 10,
        paddingLeft: 10,
        margin: 15,
    },
    search: {
        
      },
      inputSearch: {
        width: WINDOW_WITH - 60,
        fontSize: FontSize.BODY,
        lineHeight: LineHeight.BODY,
      },
})