import React, {useState} from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import BigCustomButton from '../../components/BigCustomButton';
import CustomInput from '../../components/CustomInput';
import Colors from '../../config/constants/Colors';
import FontSize from '../../config/constants/FontSize';
import Fonts from '../../config/constants/Fonts';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {signupThunk} from '../../redux/thunks/auth.thunks';
import {useNavigation} from '@react-navigation/native';

const SingUp = () => {
  const navigation = useNavigation();
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  const onSignUp = async data => {
    console.log('signup data: ', data);
    dispatch(signupThunk(data));
  };

  const OnGotoSignIn = () => {
    navigation.navigate('SignIn');
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerSignin}>
        <Image
          source={require('../../assets/images/together.jpg.jpg')}
          resizeMode="stretch"
          style={styles.ImageSignin}></Image>
        <Text style={styles.textHeader}>Cùng nhau đi đến thành công!</Text>
      </View>
      <ScrollView style={styles.formSignin}>
        <Text style={styles.titleFormSignin}>Đăng Kí</Text>
        <CustomInput
          name="name"
          placeholder="Họ và tên"
          control={control}
          rules={{required: 'Họ và tên không để trống!'}}
        />
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{required: 'Email không để trống!'}}
        />
        <CustomInput
          name="password"
          placeholder="Mật khẩu"
          secureTextEntry
          control={control}
          rules={{
            required: 'Mật khẩu không để trống!',
            minLength: {
              value: 8,
              message: 'Mật khẩu nên để từ 8 kí tự!',
            },
          }}
        />
        <CustomInput
          name="password"
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
          control={control}
          rules={{
            required: 'Mật khẩu không để trống!',
            minLength: {
              value: 8,
              message: 'Mật khẩu nên để từ 8 kí tự!',
            },
          }}
        />
        <BigCustomButton disable={false} onPress={handleSubmit(onSignUp)}>
          Đăng kí
        </BigCustomButton>
        <View style={styles.signUpButtonContainer}>
          <Pressable onPress={OnGotoSignIn}>
            <Text style={styles.textSignUp}>Đăng Nhập?</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View style={styles.footerSignin}></View>
    </View>
  );
};

export default SingUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSignin: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.WHITE,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.SECONDARY,
  },
  textHeader: {
    color: Colors.PRIMARY,
    paddingTop: 20,
    fontSize: FontSize.H5,
  },
  ImageSignin: {
    width: '60%',
    height: '70%',
    borderRadius: 8,
  },
  formSignin: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    paddingLeft: 30,
  },
  titleFormSignin: {
    color: Colors.PRIMARY,
    fontSize: FontSize.H5,
    marginTop: 20,
    marginBottom: 10,
  },
  footerSignin: {
    height: '8%',
    backgroundColor: Colors.SECONDARY,
  },
  signUpButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 30,
  },
  ButtonForgotPassword: {
    alignItems: 'flex-end',
    marginRight: 30,
    padding: 5,
  },
  textSignUp: {
    color: Colors.PRIMARY,
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
    padding: 5,
  },
});
