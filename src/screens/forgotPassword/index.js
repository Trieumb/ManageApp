import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import CustomInput from '../../components/CustomInput';
import BigCustomButton from '../../components/BigCustomButton';
import Colors from '../../config/constants/Colors';
import FontSize from '../../config/constants/FontSize';
import {useNavigation} from '@react-navigation/native';
import HeaderCustom from '../../components/HeaderCustom';
import {useDispatch, useSelector} from 'react-redux';
import {resetPasswordThunk} from '../../redux/thunks/auth.thunks';
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  const emailIsSent = useSelector(state => state.auth.isEmailSent);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onGotoLogin = () => {
    navigation.navigate('SignIn');
  };

  const onSendPasswordResetEmail = async data => {
    console.log('data: ', data);
    dispatch(resetPasswordThunk(data));
  };
  let form = (
    <View style={styles.form}>
      <Text style={styles.titleForm}>Nhập email</Text>
      <CustomInput name="email" control={control} />
      <BigCustomButton
        onPress={handleSubmit(onSendPasswordResetEmail)}
        disable={false}>
        Gửi
      </BigCustomButton>
    </View>
  );

  if (emailIsSent && !isLoading) {
    form = (
      <View style={styles.form}>
        <Text style={styles.notiText}>Forgot Password Success</Text>
        <BigCustomButton disable={isLoading} onPress={onGotoLogin}>
          Back to login
        </BigCustomButton>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderCustom />
      <View style={styles.formContainer}>{form}</View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  titleForm: {
    fontSize: FontSize.H5,
    color: Colors.PRIMARY,
    paddingVertical: 10,
  },
  form: {
    borderRadius: 8,
    shadowColor: Colors.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 4,
    backgroundColor: Colors.HEADER,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  notiText: {
    fontSize: FontSize.H5,
    textTransform: 'capitalize',
    color: Colors.PRIMARY,
    marginBottom: 20,
  },
});
