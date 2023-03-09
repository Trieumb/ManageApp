import React from "react";
import { View, Text, StyleSheet,TextInput, Pressable} from 'react-native';
import Colors from '../config/constants/Colors';
import Fonts from "../config/constants/Fonts";
import FontSize from "../config/constants/FontSize";


const InputCustomImportInventory = ({ setCustomInputsImport, customInputsImport }) => {

    const handleAddCustomInputImport = () => {
        const newCustomInput = { id: customInputsImport.length + 1, importNo: 'STT', importCode: 'Mã VT', importName: 'Tên VT', importUnit: 'Đơn vị', importQuantity: 'Số lượng' };
        const newCustomInputs = [...customInputsImport, newCustomInput];
        setCustomInputsImport(newCustomInputs);
    }
    const handleInputChange = (text, id, inputName) => {
        const newCustomInputs = [...customInputsImport];
        const index = newCustomInputs.findIndex(input => input.id === id);
        newCustomInputs[index][inputName] = text;
        setCustomInputsImport(newCustomInputs);
    }

    return (
        <View>
            {customInputsImport.map((customInput, index) => (
                <View key={index} style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputNo}
                        value={customInput.importNo}
                        placeholder={customInput.importNo}
                        onChangeText={text => handleInputChange(text, customInput.importNo, 'no')}
                    />
                    <TextInput
                        style={styles.inputCode}
                        value={customInput.importCode}
                        placeholder={customInput.importCode}
                        onChangeText={text => handleInputChange(text, customInput.importCode, 'code')}
                    />
                    <TextInput
                        style={styles.inputName}
                        value={customInput.importName}
                        placeholder={customInput.importName}
                        onChangeText={text => handleInputChange(text, customInput.importName, 'name')}
                    />
                    <TextInput
                        style={styles.inputUnit}
                        value={customInput.importUnit}
                        onChangeText={text => handleInputChange(text, customInput.importUnit, 'unit')}
                    />
                    <TextInput
                        style={styles.inputQuantity}
                        value={customInput.importQuantity}
                        onChangeText={text => handleInputChange(text, customInput.importQuantity, 'quantity')}
                    />
                </View>
            ))}
            <Pressable onPress={handleAddCustomInputImport} style={styles.buttonAdd}>
                <Text style={styles.textAdd}>+</Text>
            </Pressable>
        </View>
    );
}

export default InputCustomImportInventory

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