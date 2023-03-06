import React, { useState } from 'react'
import {
    StyleSheet,
    Pressable,
    View,
    Text,
    Image,
    TextInput,
    Alert,
} from 'react-native';
import BigCustomButton from '../../components/BigCustomButton';
import CustomInput from '../../components/CustomInput';
import Colors from '../../config/constants/Colors';
import FontSize from '../../config/constants/FontSize';
import Fonts from '../../config/constants/Fonts';
import { WINDOW_WITH } from '../../config/constants/DimensionsWindown';
import { useForm, Controller } from 'react-hook-form';


const onSignIn = (data) => {
    Alert.alert(JSON.stringify(data));
}

const SingIn = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm();

    return (
        <View style={styles.container}>
            <View style={styles.headerSignin}>
                <Image source={require('../../assets/images/together.jpg.jpg')}
                    resizeMode="stretch"
                    style={styles.ImageSignin}></Image>
                <Text style={styles.textHeader}>Cùng nhau đi đến thành công!</Text>
            </View>
            <View style={styles.formSignin}>
                <Text style={styles.titleFormSignin}>Đăng nhập</Text>
                <CustomInput
                    name="email"
                    placeholder="Email"
                    control={control}
                    rules={{ required: 'Email không để trống!' }}
                />
                <CustomInput
                    name="password"
                    placeholder="Password"
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
                <Pressable style={styles.ButtonForgotPassword}>
                    <Text style={styles.textForgotPassword}>Quên mật khẩu?</Text>
                </Pressable>
            </View>
            <View style={styles.footerSignin}>
            </View>
        </View>
    )
}

export default SingIn

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
        borderBottomColor: Colors.SECONDARY
    },
    textHeader: {
        color: Colors.PRIMARY,
        paddingTop: 20,
        fontSize: FontSize.H5
    },
    ImageSignin: {
        width: "60%",
        height: "70%",
        borderRadius: 8
    },
    formSignin: {
        backgroundColor: Colors.WHITE,
        height: "50%",
        justifyContent: 'center',
        paddingLeft: 30
    },
    titleFormSignin: {
        color: Colors.PRIMARY,
        fontSize: FontSize.H5,
        marginBottom: 10,
    },
    footerSignin: {
        height: "8%",
        backgroundColor: Colors.SECONDARY,
    },
    ButtonForgotPassword: {
        alignItems: 'flex-end',
        marginRight: 30,
        padding: 5,
    },
    textForgotPassword: {
        color: Colors.PRIMARY
    }

})
