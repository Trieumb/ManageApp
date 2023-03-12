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

const UpdateTask = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  const navigation = useNavigation();
  const UpdateTask = data => {
    Alert.alert(JSON.stringify(data));
  };
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
        <Text style={styles.textHeader}>Sửa kế hoạch công việc</Text>
      </ImageBackground>
      <ScrollView style={styles.body}>
        <CustomInput
          name="dateStart"
          placeholder="Ngày khởi tạo"
          control={control}
          rules={{required: 'Không để trống!'}}
        />
        <CustomInput
          name="dateEnd"
          placeholder="Ngày hoàn thành"
          control={control}
          rules={{}}
        />
        <CustomInput
          name="receiver"
          placeholder="Người nhận"
          control={control}
          rules={{}}
        />
        <CustomInput
          name="content"
          placeholder="Chi tiết công việc"
          control={control}
          rules={{required: 'Không để trống!'}}
        />
        <BigCustomButton disable={false} onPress={handleSubmit(UpdateTask)}>
          Xác nhận
        </BigCustomButton>
      </ScrollView>
      <View style={styles.footer}></View>
    </View>
  );
};

export default UpdateTask;

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
