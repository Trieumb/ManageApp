import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Pressable
} from 'react-native';
import BigCustomButton from '../../components/BigCustomButton';
import Colors from '../../config/constants/Colors';
import FontSize from '../../config/constants/FontSize';
import Fonts from '../../config/constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputCustomImportInventory from '../../components/CustomInputImportInventory';

const GoodsDelivery = () => {

    const [customInputsImport, setCustomInputsImport] = useState([
        {
            id: 1,
            importNo: "STT",
            importCode: "Mã VT",
            importName: "Tên VT",
            importUnit: "Đơn vị",
            importQuantity: "Số lượng"
        }
    ]);

    return (
        <View style={styles.container}>
            <View>
                <ScrollView style={styles.body}>
                    <Text style={styles.title} >Phiếu nhập kho</Text>
                    <View style={styles.dateContainer}>
                        <TextInput style={styles.inputDate} placeholder='Ngày' />
                        <Pressable style={styles.buttonDate}>
                            <Ionicons name='calendar' size={20} color={Colors.PRIMARY} />
                        </Pressable>
                    </View>
                    <View style={styles.headerContainer}>
                        <Text style={[styles.headerItemNo, styles.headerItem]}>Số TT</Text>
                        <Text style={[styles.headerItemCode, styles.headerItem]}>Mã VT</Text>
                        <Text style={[styles.headerItemName, styles.headerItem]}>Tên VT</Text>
                        <Text style={[styles.headerItemUnit, styles.headerItem]}>Đơn vị</Text>
                        <Text style={[styles.headerItemQuantity, styles.headerItem]}>Số lượng</Text>
                    </View>
                    <InputCustomImportInventory customInputsImport={customInputsImport} setCustomInputsImport={setCustomInputsImport}/>
                    <View style={{ marginLeft: 30 , marginTop: 30 }}>
                        <BigCustomButton disable={false}>
                            Xác nhận
                        </BigCustomButton>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const InputCustom = () => {
    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.inputNo} placeholder='STT' />
            <TextInput style={styles.inputCode} placeholder='Mã VT' />
            <TextInput style={styles.inputName} placeholder='Tên VT' />
            <TextInput style={styles.inputUnit} placeholder='Đơn vị' />
            <TextInput style={styles.inputQuantity} placeholder='Số lượng' />
        </View>
    )
}
export default GoodsDelivery

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: Colors.PRIMARY,
        fontSize: FontSize.H5,
        fontFamily: Fonts.POPPINS,
        padding: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        height: 45,
        margin: 10,
        borderRadius: 8,
    },
    inputDate: {
        paddingLeft: 10,
    },
    buttonDate: {
        paddingRight: 10
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    headerItem: {
        padding: 5,
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
        fontSize: FontSize.BODY,
    },
    headerItemNo: {
        width: '10%',
    },
    headerItemCode: {
        width: '20%',
    },
    headerItemName: {
        width: '35%',
    },
    headerItemUnit: {
        width: '15%',
    },
    headerItemQuantity: {
        width: '20%'
    },
    inputNo: {
        backgroundColor: Colors.WHITE,
        width: '10%',
    },
    inputCode: {
        backgroundColor: Colors.WHITE,
        width: '20%',
    },
    inputName: {
        backgroundColor: Colors.WHITE,
        width: '35%',
    },
    inputUnit: {
        backgroundColor: Colors.WHITE,
        width: '15%'
    },
    inputQuantity: {
        backgroundColor: Colors.WHITE,
        width: '20%'
    },
    inputContainer: {
        flexDirection: 'row',
    },
})