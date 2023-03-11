import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
} from 'react-native';
import BigCustomButton from '../../../components/BigCustomButton';
import ListSupplies from './ListsSupplies';
import { useDispatch } from 'react-redux';
import { saveImportData } from '../../../redux/thunks/inventory.thunk';

const GoodsDelivery = () => {

    const dispatch = useDispatch();
    const [supplies, setSupplies] = useState([]);
    const [dateStockin, setDateStockin] = useState('');
    const [supplier, setSupplier] = useState('')

    const handleAddSupplies = (data) => {
        setSupplies([...supplies, data]);
    };

    
    const handleStockin = () => {
        dispatch(saveImportData({dateStockin,supplier,supplies}));
        console.log("click");
        console.log(supplies);
        console.log(dateStockin);
    }
    return (
        <View style={styles.container}>
             <View style={{justifyContent: 'center', alignItems: 'center'}}> 
                    <TextInput
                    value={dateStockin}
                    placeholder="Ngày nhập kho"
                    onChangeText={(text) => setDateStockin(text)}/>
                    <TextInput
                    value={supplier}
                    placeholder="Nhà cung cấp"
                    onChangeText={(text) => setSupplier(text)}/> 
                </View>
            <View style={{ flex: 1 }}>
                <ListSupplies supplies={supplies} handleAddSupplies={handleAddSupplies} />
            </View>
            <View style={styles.button}>
                <BigCustomButton disable={false} onPress={handleStockin}>
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
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})