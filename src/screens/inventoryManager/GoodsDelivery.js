import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Button } from 'react-native';
import BigCustomButton from '../../components/BigCustomButton';
import Colors from '../../config/constants/Colors';
import FontSize from '../../config/constants/FontSize';
import Fonts from '../../config/constants/Fonts';
import Ionicons from  'react-native-vector-icons/Ionicons';
import InputCustomExportInventory from '../../components/CustoInputExportInventory';

const GoodsDelivery = () => {

    const [customInputs, setCustomInputs] = useState([
        {
            id: 1,
            no: "STT",
            code: "Mã VT",
            name: "Tên VT",
            unit: "Đơn vị",
            quantity: "Số lượng"
        }
    ]);
    return (
        <View style={styles.container}>
            <View>
                <ScrollView style={styles.body}>
                    <Text style={styles.title} >Phiếu xuất kho</Text>
                    <View style={styles.dateContainer}>
                        <TextInput style={styles.inputDate} placeholder='Ngày' />
                        <Pressable style={styles.buttonDate}>
                            <Ionicons name='calendar' size={20} color={Colors.PRIMARY} />
                        </Pressable>
                    </View>
                    <TextInput style={styles.input} placeholder='Lý do xuất kho' />
                    <View style={styles.headerContainer}>
                        <Text style={[styles.headerItemNo, styles.headerItem]}>Số TT</Text>
                        <Text style={[styles.headerItemCode, styles.headerItem]}>Mã VT</Text>
                        <Text style={[styles.headerItemName, styles.headerItem]}>Tên VT</Text>
                        <Text style={[styles.headerItemUnit, styles.headerItem]}>Đơn vị</Text>
                        <Text style={[styles.headerItemQuantity, styles.headerItem]}>Số lượng</Text>
                    </View>
                    <InputCustomExportInventory customInputs={customInputs} setCustomInputs={setCustomInputs} />
                    <View style={{ marginLeft: 30, marginTop: 30 }}>
                        <BigCustomButton disable={false} onPress={() => setCustomInputs([])}>
                            Xác nhận
                        </BigCustomButton>
                    </View>
                </ScrollView>
            </View>
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
    // header item
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
    // input
    input: {
        backgroundColor: Colors.WHITE,
        margin: 8,
        borderRadius: 8,
        paddingLeft: 10
    },
});
