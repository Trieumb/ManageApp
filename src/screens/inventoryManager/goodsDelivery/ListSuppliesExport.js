import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet, Modal,ScrollView, Pressable} from "react-native";
import CustomInput from "../../../components/CustomInput";
import Colors from "../../../config/constants/Colors";
import FontSize from "../../../config/constants/FontSize";
import Fonts from "../../../config/constants/Fonts";
import { useForm } from 'react-hook-form';
import BigCustomButton from "../../../components/BigCustomButton";
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListSuppliesExport = ({ suppliesExport, setSuppliesExport, handleAddSuppliesExport }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [resetInput, setResetInput] = useState(false);

    useEffect(() => {
        if (!modalVisible) {
            reset();
        }
    }, [modalVisible]);

    const handleShowFormCustomInput = () => {
        setModalVisible(true);
    };

    const handleHideFormCustomInput = () => {
        setModalVisible(false);
        setResetInput(false);
    };

    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm();


    const addSuppliesExport = (data) => {
        handleAddSuppliesExport(data, parseInt(data.exportQuantity));
        handleHideFormCustomInput();
    }
  
    const renderItem = ({ item, index }) => (
        <View style={styles.inputContainer}>
            <Text style={[styles.inputNo, styles.flatListItem]}>{index+1}</Text>
            <Text style={[styles.inputCode,styles.flatListItem]}>{item.model}</Text>
            <Text style={[styles.inputName,styles.flatListItem]}>{item.name}</Text>
            <Text style={[styles.inputUnit,styles.flatListItem]}>{item.unit}</Text>
            <Text style={[styles.inputQuantity,styles.flatListItem]}>{item.exportQuantity}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable onPress={handleShowFormCustomInput}
                        style={styles.AddButton}>
                        <Text style={{ color: Colors.WHITE, fontSize: FontSize.H5 }}>+</Text>
                    </Pressable>
                </View>
            </View>
            {true? (<View style={styles.headerContainer}>
                <Text style={[styles.headerItemNo, styles.headerItem]}>Số TT</Text>
                <Text style={[styles.headerItemCode, styles.headerItem]}>Mã VT</Text>
                <Text style={[styles.headerItemName, styles.headerItem]}>Tên VT</Text>
                <Text style={[styles.headerItemUnit, styles.headerItem]}>Đơn vị</Text>
                <Text style={[styles.headerItemQuantity, styles.headerItem]}>Số lượng</Text>
            </View>) : null}
            <FlatList
                data={suppliesExport}
                renderItem={renderItem}
                keyExtractor={(item) => item.model}
            />
            <Modal animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible)}}>
                <View style={styles.modalContainer}>
                    <View style={styles.conatinerHeaderModal}>
                        <Pressable onPress={handleHideFormCustomInput} style={styles.buttonHeaderModal}>
                            <Ionicons name='chevron-back-outline' size={25} color={Colors.PRIMARY} />
                        </Pressable>
                        <Text style={styles.subButton}>Thoát</Text>
                    </View>
                    <ScrollView>
                        <CustomInput
                            reset={reset}
                            resetInput={resetInput}
                            name="model"
                            placeholder="Mã vật tư"
                            control={control}
                            rules={{ require: 'Không để trống!' }}
                        />
                        <CustomInput
                            name="name"
                            placeholder="Tên vật tư"
                            control={control}
                            rules={{ required: 'Không để trống!' }}
                        />
                        <CustomInput
                            name="unit"
                            placeholder="Đơn vị"
                            control={control}
                            rules={{ required: 'Không để trống!' }}
                        />
                        <CustomInput
                            name="exportQuantity"
                            type='number'
                            placeholder="Số lượng"
                            keyboardType='numeric'
                            control={control}
                            rules={{ required: 'Không để trống!' }}
                        />
                        <BigCustomButton disable={false} onPress={handleSubmit(addSuppliesExport)}>
                            Thêm
                        </BigCustomButton>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}

export default ListSuppliesExport

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    AddButton: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: Colors.PRIMARY_300,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
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
        paddingVertical: 4,
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
        paddingVertical: 10,
    },
    flatListItem: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
        fontSize: FontSize.BODY,
        color: Colors.PRIMARY
    },
    // modal
    modalContainer: {
        flex: 1,
        backgroundColor: Colors.PRIMARY_100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonHeaderModal: {

    },
    conatinerHeaderModal: {
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    subButton: {
        color: Colors.PRIMARY,
        fontSize: FontSize.BODY_18
    }
})