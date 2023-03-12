import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import BigCustomButton from '../../components/BigCustomButton';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';
import CustomButtonBack from '../../components/CustomButtonBack';
import Colors from '../../config/constants/Colors';
import Fonts from '../../config/constants/Fonts';
import FontSize from '../../config/constants/FontSize';
import {useNavigation} from '@react-navigation/native';
import LineHeight from '../../config/constants/LineHeight';

const EditUser = () => {
  const navigation = useNavigation();
  const onGotoBack = () => {
    navigation.navigate('HomeNavigator');
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.HEADER}
        translucent={true}
      />
      <ImageBackground style={styles.header}>
        <CustomButtonBack onPress={onGotoBack} />
        <Text style={styles.textHeader}>Cập nhật người dùng</Text>
      </ImageBackground>
      <View>
        <Text>Name</Text>
      </View>
      <View>
        <Text>Email</Text>
      </View>
      <View>
        <Text>Role</Text>
      </View>
      <ScrollView style={styles.body}>
        <BigCustomButton disable={false} onPress={() => {}}>
          Xác nhận
        </BigCustomButton>
      </ScrollView>
      <View style={styles.footer}></View>
    </View>
  );
};

export default EditUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    backgroundColor: Colors.HEADER,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '15%',
    paddingTop: 30,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  textHeader: {
    color: Colors.PRIMARY,
    fontSize: FontSize.BODY_18,
    padding: 8,
    lineHeight: LineHeight.BODY,
  },
  body: {
    flex: 1,
    marginLeft: 30,
    marginTop: 30,
  },
  titleBody: {
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: FontSize.H5,
    paddingBottom: 20,
    color: Colors.PRIMARY,
  },
  footer: {
    height: '15%',
    width: '100%',
    backgroundColor: Colors.HEADER,
  },
});
