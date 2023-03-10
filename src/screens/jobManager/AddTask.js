import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Alert,
    ScrollView,
} from 'react-native';
import BigCustomButton from '../../components/BigCustomButton';
import CustomInput from '../../components/CustomInput';
import { useForm } from 'react-hook-form';
import Colors from '../../config/constants/Colors';
import Fonts from '../../config/constants/Fonts';
import FontSize from '../../config/constants/FontSize';
import { useNavigation } from '@react-navigation/native';

const AddTask = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const navigation = useNavigation();
    const addTask = (data) => {
        Alert.alert(JSON.stringify(data));
    }
    const onGotoBack = () => {
        navigation.navigate('JobManager')
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.body}>
                <Text style={styles.titleBody}>Thêm kế hoạch</Text>
                <CustomInput
                    name="dateStart"
                    placeholder="Ngày khởi tạo"
                    control={control}
                    rules={{ required: 'Không để trống!' }}
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
                    rules={{ required: 'Không để trống!' }}
                />
                <BigCustomButton disable={false} onPress={handleSubmit(addTask)}>
                    Tạo mới
                </BigCustomButton>
            </ScrollView>
        </View>
    )
}

export default AddTask

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    titleBody: {
        color: Colors.PRIMARY,
        fontFamily: Fonts.POPPINS_BOLD,
        fontSize: FontSize.H5,
        paddingVertical: 15,
    },
    body: {
        flex: 1,
        marginLeft: 30,
        marginTop: 30,
    },
})