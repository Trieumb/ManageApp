import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
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
import { fetchCustomers, updateCustomer } from '../../redux/thunks/customer.thunk';
import { useDispatch } from 'react-redux';

const UpdateCustomer = ({route}) => {

  const {item} = route.params;
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const UpdateCustomer = data => {
    const customerId = item.id;
    dispatch(updateCustomer({ customerId , data}));
    console.log(data);
    dispatch(fetchCustomers());
    navigation.goBack();
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
      <View style={styles.header}>
        <CustomButtonBack onPress={onGotoBack} />
        <Text style={styles.textHeader}>Sửa thông tin khách hàng</Text>
      </View>
      <ScrollView style={styles.body}>
        <CustomInput
          name="name"
          placeholder="Tên khách hàng"
          defaultValue={item.name}
          control={control}
          rules={{required: 'Không để trống!'}}
        />
        <CustomInput
          name="address"
          placeholder="Địa chỉ"
          defaultValue={item.address}
          control={control}
          rules={{}}
        />
        <CustomInput
          name="phone"
          placeholder="Số ĐT"
          control={control}
          defaultValue={item.phone}
          rules={{require: 'Không để trống!'}}
        />
        <CustomInput
          name="installationDate"
          placeholder="Ngày lắp đặt"
          control={control}
          defaultValue={item.installationDate}
          rules={{required: 'Không để trống!'}}
        />
        <CustomInput
          name="category"
          placeholder="Loại thang"
          control={control}
          defaultValue={item.category}
          rules={{required: 'Không để trống!'}}
        />
        <CustomInput
          name="description"
          placeholder="Mô tả"
          control={control}
          defaultValue={item.description}
          rules={{required: 'Không để trống!'}}
        />
        <BigCustomButton disable={false} onPress={handleSubmit(UpdateCustomer)}>
          Xác nhận
        </BigCustomButton>
      </ScrollView>
      <View style={styles.footer}></View>
    </View>
  );
};

export default UpdateCustomer;

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
