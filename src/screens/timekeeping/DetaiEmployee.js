import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, Modal } from 'react-native';
import CustomSearchInput from '../../components/CustomSearchInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors, { TIME_KEEPING_COLORS } from '../../config/constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { userListSelector } from '../../redux/selectors/users.selector';
import { getAllUsersThunk } from '../../redux/thunks/user.thunk';
import FontSize from '../../config/constants/FontSize';
import FooterCustom from '../../components/FooterCustom';

const DetaiEmployee = () => {
    const dispatch = useDispatch();
    const userList = useSelector(userListSelector);
    console.log('userList', userList);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);;
    useEffect(() => {
        dispatch(getAllUsersThunk());
    }, [dispatch]);

    const showModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
      }; 

      const FlatsListItem = ({ item, index }) => {
        return (
            <View style={styles.FlatlistContainer}>
                <Text style={[styles.no, styles.item]}>{index + 1}</Text>
                <Text style={[styles.name, styles.item]}>{item.name}</Text>
                <Text style={[styles.role, styles.item]}>{item.role}</Text>
                <View style={styles.detailButton}>
                    <Pressable
                        style={styles.deleteIcon}
                        onPress={() => { showModal(item);}}>
                        <Ionicons name="list" size={24} color={Colors.PRIMARY_300} />
                    </Pressable>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <CustomSearchInput />
            <Text style={styles.title}>Danh sách nhân viên chấm công tháng: 10</Text>
            <FlatList
                data={userList}
                keyExtractor={item => item.name}
                renderItem={({ item, index }) => (
                    <FlatsListItem item={item} index={index} />
                )} />
            <Modal
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalHeader}>
                    <Pressable style={styles.buttonBack} onPress={() => setModalVisible(false)}>
                        <Ionicons name="chevron-back" size={20} style={styles.icon} />
                        <Text style={styles.textModalHeader}>Quay lại</Text>
                    </Pressable>
                </View>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalItem}>Tên nhân viên : {selectedItem && selectedItem.name}</Text>
                        <Text style={styles.modalItem}>Vị trí : {selectedItem && selectedItem.role}</Text>
                        <Text style={[styles.working, styles.modalItem]}>Số ngày đi làm: </Text>
                        <Text style={[styles.off, styles.modalItem]}>Số ngày vắng: </Text>
                        <Text style={[styles.leave, styles.modalItem]}>Số ngày nghỉ phép: </Text>
                        <Text style={[styles.halfday, styles.modalItem]}>Số ngày làm nửa ngày: </Text>
                        <Text style={[styles.overTime, styles.modalItem]}>Số giờ tăng ca: </Text>
                    </View>
                </View>
                <FooterCustom />
            </Modal>
        </View>
    )
}

export default DetaiEmployee

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center'
    },
    title: {
        color: Colors.SUCCESS,
        fontSize: FontSize.BODY_18,
        justifyContent: 'center',
        paddingBottom: 20,
    },
    FlatlistContainer: {
        flexDirection: 'row',
        marginHorizontal: 8,
        borderRadius: 8,
        backgroundColor: Colors.WHITE,
        marginVertical: 2
    },
    item: {
        marginVertical: 2,
        padding: 8,
        fontSize: FontSize.BODY
    },
    no: {
        width: '10%',
    },
    name: {
        width: '50%',
    },
    role: {
        width: '30%',
    },
    detailButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteIcon: {
        padding: 8
    },
    // modal
    modalContainer: {
        flex: 1,
      },
      modalContent: {
        marginTop: 30,
        padding: 10,
        borderRadius: 10,
      },
      modalItem: {
        padding: 6,
        fontSize: FontSize.BODY,
        backgroundColor: Colors.WHITE,
        marginVertical: 5,
        borderRadius: 10,
      },
      modalHeader: {
        height: '7%',
        padding: 15,
        backgroundColor: Colors.HEADER,
      },
      buttonBack: {
        flexDirection: 'row',
      },
      icon: {
        color: Colors.PRIMARY,
      },
      textModalHeader: {
        color: Colors.PRIMARY,
        marginLeft: 5
      },
      working: {
        color: TIME_KEEPING_COLORS.working,
      },
      off: {
        color: TIME_KEEPING_COLORS.off,
      },
      leave: {
        color: TIME_KEEPING_COLORS.leave,
      },
      halfday: {
        color: TIME_KEEPING_COLORS.halfday
      },
      overTime: {
        color: Colors.PRIMARY,
      }
})