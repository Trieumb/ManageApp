import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable
} from 'react-native';
import BigCustomButton from '../../../components/BigCustomButton';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../../config/constants/Colors';
import { WINDOW_WITH } from '../../../config/constants/DimensionsWindown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontSize from '../../../config/constants/FontSize';
import Fonts from '../../../config/constants/Fonts';
import { saveAndRefreshInventoryAfterExport} from '../../../redux/thunks/inventory.thunk';
import ListSuppliesExport from './ListSuppliesExport';

const GoodsDelivery = () => {

    const dispatch = useDispatch();
    const [suppliesExport, setSuppliesExport] = useState([]);
    const [dateStockOut, setDateStockOut] = useState('');
    const [cause, setCause] = useState('');

    const handleAddSuppliesExport = (data) => {
        setSuppliesExport([...suppliesExport, data]);
    };
    const handleGoodsDelivery = () => {
        try {
            dispatch(saveAndRefreshInventoryAfterExport({ dateStockOut, cause, suppliesExport }));
            setSuppliesExport([]);
            setDateStockOut('');
            setCause('');
            console.log("click");
            console.log(suppliesExport);
            console.log(dateStockOut);
            console.log(cause);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.title} >Phiếu xuất kho</Text>
                <View style={styles.dateContainer}>
                    <TextInput
                        style={styles.inputDate}
                        value={dateStockOut}
                        placeholder="Ngày xuất kho"
                        placeholderTextColor={Colors.DARKGRAY}
                        onChangeText={(text) => setDateStockOut(text)} />
                    <Pressable style={styles.buttonDate}>
                        <Ionicons name='calendar' size={20} color={Colors.PRIMARY} />
                    </Pressable>
                </View>
                <TextInput
                    style={styles.input}
                    value={cause}
                    placeholder="Lý do xuất kho"
                    placeholderTextColor={Colors.DARKGRAY}
                    onChangeText={(text) => setCause(text)} />
            </View>
            <View style={{ flex: 1 }}>
                <ListSuppliesExport suppliesExport={suppliesExport} handleAddSuppliesExport={handleAddSuppliesExport} />
            </View>
            <View style={styles.button}>
                <BigCustomButton disable={false} onPress={handleGoodsDelivery}>
                    Xuất
                </BigCustomButton>
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
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        height: 45,
        margin: 10,
        borderRadius: 8,
        width: WINDOW_WITH - 20,
    },
    input: {
        backgroundColor: Colors.WHITE,
        width: WINDOW_WITH - 20,
        borderRadius: 8,
        marginVertical: 5,
        padding: 8,

    },
    inputDate: {
        padding: 8,
    },
    buttonDate: {
        paddingRight: 10
    },
})