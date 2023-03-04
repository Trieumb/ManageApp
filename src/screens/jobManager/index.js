import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import BigCustomButton from '../../components/BigCustomButton';
import { WINDOW_WITH } from '../../config/constants/DimensionsWindown';
import Colors from '../../config/constants/Colors';
import { useNavigation } from '@react-navigation/native';


const JobManager = () => {

  const navigation = useNavigation()
  const handleOnpress = () => {
    navigation.navigate('Kho');
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerJob}>
        <Text>Quản lý công việc</Text>
      </View>
      <BigCustomButton disable={false} onPress={handleOnpress}>
       Go
      </BigCustomButton>
    </View>
  )
}

export default JobManager

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerJob: {

  }
})