import React from "react";
import { View, Text, StyleSheet,TextInput, Pressable} from 'react-native';
import Colors from '../config/constants/Colors';
import Fonts from "../config/constants/Fonts";
import FontSize from "../config/constants/FontSize";


const InputCustomExportInventory = ({ setCustomInputs, customInputs }) => {

    const handleAddCustomInput = () => {
        const newCustomInput = { id: customInputs.length + 1, no: 'STT', code: 'Mã VT', name: 'Tên VT', unit: 'Đơn vị', quantity: 'Số lượng' };
        const newCustomInputs = [...customInputs, newCustomInput];
        setCustomInputs(newCustomInputs);
    }
    const handleInputChange = (text, id, inputName) => {
        const newCustomInputs = [...customInputs];
        const index = newCustomInputs.findIndex(input => input.id === id);
        newCustomInputs[index][inputName] = text;
        setCustomInputs(newCustomInputs);
    }

    return (
        <View>
            {customInputs.map((customInput, index) => (
                <View key={index} style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputNo}
                        value={customInput.no}
                        placeholder={customInput.no}
                        onChangeText={text => handleInputChange(text, customInput.id, 'no')}
                    />
                    <TextInput
                        style={styles.inputCode}
                        value={customInput.code}
                        onChangeText={text => handleInputChange(text, customInput.code, 'code')}
                    />
                    <TextInput
                        style={styles.inputName}
                        value={customInput.name}
                        onChangeText={text => handleInputChange(text, customInput.name, 'name')}
                    />
                    <TextInput
                        style={styles.inputUnit}
                        value={customInput.unit}
                        onChangeText={text => handleInputChange(text, customInput.name, 'unit')}
                    />
                    <TextInput
                        style={styles.inputQuantity}
                        value={customInput.quantity}
                        onChangeText={text => handleInputChange(text, customInput.quantity, 'quantity')}
                    />
                </View>
            ))}
            <Pressable onPress={handleAddCustomInput} style={styles.buttonAdd}>
                <Text style={styles.textAdd}>+</Text>
            </Pressable>
        </View>
    );
}

export default InputCustomExportInventory

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.WHITE,
        margin: 8,
        borderRadius: 8,
        paddingLeft: 10
    },
    inputNo: {
        backgroundColor: Colors.WHITE,
        width: '10%',
        color: Colors.DARKGRAY,
    },
    inputCode: {
        backgroundColor: Colors.WHITE,
        width: '20%',
        color: Colors.DARKGRAY
    },
    inputName: {
        backgroundColor: Colors.WHITE,
        width: '35%',
        color: Colors.DARKGRAY
    },
    inputUnit: {
        backgroundColor: Colors.WHITE,
        width: '15%',
        color: Colors.DARKGRAY
    },
    inputQuantity: {
        backgroundColor: Colors.WHITE,
        width: '20%',
        color: Colors.DARKGRAY
    },
    inputContainer: {
        flexDirection: 'row',
    },
    // button add
    buttonAdd: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 5,
        bottom: -40,

    },
    textAdd: {
        color: Colors.WHITE,
        fontSize: FontSize.H4
    },
})