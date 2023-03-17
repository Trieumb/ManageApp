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
import { saveAndRefreshInventoryAfterImport } from '../../../redux/thunks/inventory.thunk';
import Colors from '../../../config/constants/Colors';
import { WINDOW_WITH } from '../../../config/constants/DimensionsWindown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontSize from '../../../config/constants/FontSize';
import Fonts from '../../../config/constants/Fonts';
import ListSuppliesImport from './ListsSuppliesImport';

const GoodsDelivery = () => {

    const dispatch = useDispatch();
    const [supplies, setSupplies] = useState([]);
    const [dateStockin, setDateStockin] = useState('');
    const [supplier, setSupplier] = useState('');

    const handleAddSupplies = (data) => {
        setSupplies([...supplies, data]);
    };
    const handleGoodsReceived = () => {
        dispatch(saveAndRefreshInventoryAfterImport({ dateStockin, supplier, supplies }));
        setSupplies([]);
        setDateStockin('');
        setSupplier('');
    }
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <Text style={styles.title} >Phiếu nhập kho</Text>
                <View style={styles.dateContainer}>
                    <TextInput
                        style={styles.inputDate}
                        value={dateStockin}
                        placeholder="Ngày nhập kho"
                        placeholderTextColor={Colors.DARKGRAY}
                        onChangeText={(text) => setDateStockin(text)} />
                    <Pressable style={styles.buttonDate}>
                        <Ionicons name='calendar' size={20} color={Colors.PRIMARY} />
                    </Pressable>
                </View>
                <TextInput
                    style={styles.input}
                    value={supplier}
                    placeholder="Nhà cung cấp"
                    placeholderTextColor={Colors.DARKGRAY}
                    onChangeText={(text) => setSupplier(text)} />
            </View>
            <View style={{ flex: 1 }}>
                <ListSuppliesImport supplies={supplies} handleAddSupplies={handleAddSupplies} />
            </View>
            <View style={styles.button}>
                <BigCustomButton disable={false} onPress={handleGoodsReceived}>
                    Nhập
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
});