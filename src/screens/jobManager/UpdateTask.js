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
import { updateJob, fetchJobs } from '../../redux/thunks/job.thunks';
import { useDispatch } from 'react-redux';


const UpdateTask = ({route}) => {

  const {item} = route.params;
  const dispatch = useDispatch();
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  const navigation = useNavigation();
  const UpdateTask = data => {
    const jobId = item.id;
    dispatch(updateJob({ jobId , data}));
    console.log(data);
    dispatch(fetchJobs());
    navigation.goBack();
  };
  const onGotoBack = () => {
    navigation.goBack();
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
          name="startDate"
          placeholder="Ngày khởi tạo"
          defaultValue={item.value.startDate}
          control={control}
          rules={{}}
        />
        <CustomInput
          name="endDate"
          placeholder="Ngày hoàn thành"
          defaultValue={item.value.endDate}
          control={control}
          rules={{}}
        />
        <CustomInput
          name="receiver"
          placeholder="Người nhận"
          defaultValue={item.value.receiver}
          control={control}
          rules={{}}
        />
        <CustomInput
          name="content"  
          placeholder="Chi tiết công việc"
          defaultValue={item.value.content}
          control={control}
          rules={{}}
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
