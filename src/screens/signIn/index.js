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
import {loginThunk} from '../../redux/thunks/auth.thunks';
import {useNavigation} from '@react-navigation/native';

const SingIn = () => {
  const navigation = useNavigation();
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  const onSignIn = async data => {
    console.log('login data: ', data);
    dispatch(loginThunk(data));
  };

  const OnGotoForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  const OnGotoSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerSignin}>
        <Image
          source={require('../../assets/images/together.jpg')}
          resizeMode="stretch"
          style={styles.ImageSignin}></Image>
        <Text style={styles.textHeader}>Cùng nhau đi đến thành công!</Text>
      </View>
      <ScrollView style={styles.formSignin}>
        <Text style={styles.titleFormSignin}>Đăng nhập</Text>
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
        <BigCustomButton disable={false} onPress={handleSubmit(onSignIn)}>
          Đăng nhập
        </BigCustomButton>
        <View style={styles.signUpButtonContainer}>
          <Pressable onPress={OnGotoSignUp}>
            <Text style={styles.textSignUp}>Đăng kí?</Text>
          </Pressable>
          <Text style={styles.textSignUp}>|</Text>
          <Pressable onPress={OnGotoForgotPassword}>
            <Text style={styles.textSignUp}>Quên mật khẩu?</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View style={styles.footerSignin}></View>
    </View>
  );
};

export default SingIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSignin: {
    flex: 1,
    height: '30%',
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
