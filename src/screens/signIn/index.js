import React from 'react'
import {
    StyleSheet,
    Disable,
    View,
    Text,
    Image,
    TextInput,
    ImageBackground
} from 'react-native';
import BigCustomButton from '../../components/BigCustomButton';
import { COLORS } from '../../config/constants';
import { WINDOW_WITH } from '../../config/constants/DimensionsWindown';

const SingIn = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerSignin}>
                <Image source={require('../../assets/images/together.jpg.jpg')}
                    resizeMode="stretch"
                    style={styles.ImageSignin}></Image>
            </View>
            <View style={styles.contentSignin}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize={false}>
                </TextInput>
                <TextInput style={styles.inputSignin}
                    placeholder="Mật khẩu"
                    autoCapitalize={false}>
                </TextInput>
                <BigCustomButton disable={false} children='Đăng Nhập'>
                    <Text>{children}</Text>
                </BigCustomButton>
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
        backgroundColor: COLORS.SECONDARY,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    ImageSignin: {

    },
    contentSignin: {
        height: "40%",
    },
    inputSignin: {
        width: WINDOW_WITH - 60,
        height: 40,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: COLORS.WHITE,
        marginLeft: 30,
        marginVertical: 20,
        alignItems: 'center',
    },
    butonSignin: {
        width: WINDOW_WITH - 60,
        height: 40,
        borderRadius: 40,
        backgroundColor: COLORS.PRIMARY,
        marginLeft: 30,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    footerSignin: {
        height: "20%",
        backgroundColor: COLORS.SECONDARY,
    }
})
