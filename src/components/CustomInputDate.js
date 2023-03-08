import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Modal, Alert } from 'react-native';
import Calendar from 'react-native-calendars/src/calendar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../config/constants/Colors';

const CustomInputDate = () => {

     const [showModal, setShowModal] = useState(false)
   return (
    <View>
        <TextInput>
        </TextInput>
        <Pressable onPress={() => setShowModal(true)}>
            <Ionicons name="calendar-outline"  size={30}  color={Colors.PRIMARY}/>
        </Pressable >
        <Modal visible={showModal} animationType="fade">
             <Calendar style={styles.calendar}
             onDayPress={date => {Alert.alert(date)
             setShowModal(false)}}/>
             <Pressable onPress={() => setShowModal(false)}>
                <Text>dm</Text>
                <Text>{startDate}</Text>
             </Pressable>
        </Modal>
    </View>
    )
};
export default CustomInputDate

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      marginTop: 100,
    },
  });