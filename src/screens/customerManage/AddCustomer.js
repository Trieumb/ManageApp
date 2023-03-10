import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
} from 'react-native';
import BigCustomButton from '../../components/BigCustomButton';
import CustomInput from '../../components/CustomInput';
import { useForm } from 'react-hook-form'
import Colors from '../../config/constants/Colors';
import Fonts from '../../config/constants/Fonts';
import FontSize from '../../config/constants/FontSize';
import { useNavigation } from '@react-navigation/native';
import { fetchCustomers, saveCustomerData } from '../../redux/thunks/customer.thunk';
import { useDispatch } from 'react-redux';

const AddCustomer = () => {

    const dispatch = useDispatch();
    const [resetInput, setResetInput] = useState(false);

    const handleResetInput = () => {
        setResetInput(true);
    }
    useEffect(() => {
        if (resetInput) {
            setResetInput(false);
        }
    }, [resetInput]);
    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const navigation = useNavigation();
    const addCustomer = (data) => {
        dispatch(saveCustomerData(data));
        handleResetInput();
        dispatch(fetchCustomers());
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.body}>
                <Text style={styles.titleBody}>Thêm khách hàng</Text>
                <CustomInput
                    reset={reset}
                    resetInput={resetInput}
                    name="name"
                    placeholder="Tên khách hàng"
                    control={control}
                    rules={{ required: 'Không để trống!' }}
                />
                <CustomInput
                    name="address"
                    placeholder="Địa chỉ"
                    control={control}
                    rules={{}}
                />
                <CustomInput
                    name="phone"
                    keyboardType="numeric"
                    placeholder="Số ĐT"
                    control={control}
                    rules={{ require: 'Không để trống!' }}
                />
                <CustomInput
                    name="installationDate"
                    placeholder="Ngày lắp đặt"
                    control={control}
                    rules={{ required: 'Không để trống!' }}
                />
                <CustomInput
                    name="category"
                    placeholder="Loại thang"
                    control={control}
                    rules={{ required: 'Không để trống!' }}
                />
                <CustomInput
                    name="description"
                    placeholder="Mô tả"
                    control={control}
                    rules={{ required: 'Không để trống!' }}
                />
                <BigCustomButton disable={false} onPress={handleSubmit(addCustomer)}>
                    Tạo mới
                </BigCustomButton>
            </ScrollView>
        </View>
    )
}

export default AddCustomer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    body: {
        flex: 1,
        marginLeft: 30,
        marginTop: 30,
    },
    titleBody: {
        fontFamily: Fonts.POPPINS,
        fontSize: FontSize.H5,
        paddingVertical: 15,
        color: Colors.PRIMARY
    },
})
