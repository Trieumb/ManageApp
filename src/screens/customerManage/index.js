import React, { useState } from 'react';
import {
  Text, View, StyleSheet, TextInput,
  FlatList, Alert, Pressable, Modal, ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../config/constants/Colors';
import Fonts from '../../config/constants/Fonts';
import FontSize from '../../config/constants/FontSize';
import CustomButton from '../../components/CustomButton';
import IconMeterial from 'react-native-vector-icons/MaterialCommunityIcons'
import FooterCustom from '../../components/FooterCustom';
import { WINDOW_WITH } from '../../config/constants/DimensionsWindown';
import LineHeight from '../../config/constants/LineHeight';
import { useNavigation } from '@react-navigation/native';

const dataCustomer = [
  {
    "key": "56gdffdgdfg",
    "name": "Anh Dũng",
    "phone": "0972604961",
    "address": "Phủ Lý Hà Nam",
    "installationDate": "12/11/2019",
    "category": "Thang tời",
    "description": " Thang tời thực phẩm, tải trọng 150kg, ray 5k, bảng gọi trên khung bao",

  },
  {
    "key": "56gdffdgdfghfhgfhfgg",
    "name": "Chị Minh",
    "phone": "0971 967 168",
    "address": "12L05 KĐT Định Công - Hà Nội",
    "installationDate": "12/04/2020",
    "category": "Thang tời",
    "description": " Thang tời thuốc thành phẩm, tải trọng 250kg,5 stop, ray 8k, bảng gọi thang máy 5 nút",
  },
  {
    "key": "56gdffdgdfghooofhgfhfgg",
    "name": "Phạm Hương",
    "phone": "0979 188 166",
    "address": "Sapa - Lào Cai",
    "installationDate": "08/06/2022",
    "category": "Thang đối trọng",
    "description": " Thang tời thực phẩm, tải trọng 150kg, ray 5k, 3 stop",
  }
]

const CustomerManager = () => {

  const [isModaVisible, setIsModaVisible] = useState(false);
  const navigation = useNavigation();

  const onGotoUpdteCustomer = () => {
    navigation.navigate('UpdateCustomer')
  }
  const deleteCustomer = () => {
    Alert.alert('Alert', 'Bạn có muốn xóa không?', [
      {
        text: 'Thoát',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  }


  const FlatListItem = ({ item, index }) => {
    return (
      <View style={styles.flatListContainer}>
        <ScrollView>
          <View style={styles.dateContainer}>
            <Text style={styles.textTitleItem}>Tên khách hàng: </Text>
            <Text style={styles.textDate}>{item.name}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.textTitleItem}>Địa chỉ : </Text>
            <Text style={styles.textDate}>{item.address}</Text>
          </View>
          <View style={styles.receiveContainer}>
            <Text style={styles.textTitleItem}>Số ĐT : </Text>
            <Text style={styles.textDate}>{item.phone}</Text>
          </View>
          <View style={styles.buttonActiveContainer}>
          <CustomButton style={styles.button} onPress={onGotoUpdteCustomer}>
            Sửa
          </CustomButton>
          <CustomButton style={styles.button} onPress={deleteCustomer}>
            Xóa
          </CustomButton>
        </View>
        </ScrollView>
        <Pressable onPress={() => setIsModaVisible(true)}>
          <IconMeterial name='account-details' size={20} color={Colors.PRIMARY} />
        </Pressable>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Ionicons name='search' size={20} color={Colors.PRIMARY} />
        <TextInput
          style={styles.inputSearch}
          placeholder="Tìm kiếm"
        />
      </View>
      <View style={styles.flatListRender}>
        <FlatList data={dataCustomer}
          keyExtractor={item => item.key}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index} />
          }}>
        </FlatList>
      </View>
      <Modal
        animationType="fade"
        visible={isModaVisible}
        onRequestClose={() => setIsModaVisible(false)}>
        <View style={styles.modalHeader}>
          <Pressable style={styles.buttonBack} onPress={() => setIsModaVisible(!isModaVisible)}>
            <Ionicons name="chevron-back" size={20} style={styles.icon} />
            <Text style={styles.textModalHeader}>Quay lại</Text>
          </Pressable>
        </View>
        <ScrollView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalItem}>Tên khách hàng : {dataCustomer[1].name}</Text>
            <Text style={styles.modalItem}>Địa chỉ : {dataCustomer[1].address}</Text>
            <Text style={styles.modalItem}>Số ĐT: {dataCustomer[1].phone}</Text>
            <Text style={styles.modalItem}>Ngày lắp đặt: {dataCustomer[1].installationDate}</Text>
            <Text style={styles.modalItem}>Loại thang: {dataCustomer[1].category}</Text>
            <Text style={styles.modalItem}>Mô tả: {dataCustomer[1].description}</Text>
          </View>
        </ScrollView>
        <FooterCustom />
      </Modal>
    </View>
  )
}

export default CustomerManager

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  },
  search: {
    flexDirection: "row",
    height: 40,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    paddingLeft: 10,
    margin: 10
  },
  inputSearch: {
    width: WINDOW_WITH - 60,
    fontSize: FontSize.BODY,
    lineHeight: LineHeight.BODY,
  },
  flatListContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    padding: 10,
    margin: 10,
    borderRadius: 8,
    justifyContent: 'space-between'
  },
  flatListRender: {
    flex: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  receiveContainer: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  textTitleItem: {
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
    color: Colors.BACKDROP
  },
  textTitleDetail: {
    color: Colors.PRIMARY
  },
  textDate: {
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
  },
  textDetail: {
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
  },
  flatListItem: {


  },
  headerJob: {

  },
  buttonActiveContainer: {
    flexDirection: "row",
    margin: 5
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
    color: Colors.BLACK
  },
  modalHeader: {
    height: '7%',
    padding: 15,
    backgroundColor: Colors.HEADER ,
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
})