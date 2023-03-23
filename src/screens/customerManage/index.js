import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../config/constants/Colors';
import Fonts from '../../config/constants/Fonts';
import FontSize from '../../config/constants/FontSize';
import CustomButton from '../../components/CustomButton';
import IconMeterial from 'react-native-vector-icons/MaterialCommunityIcons';
import FooterCustom from '../../components/FooterCustom';
import {useNavigation} from '@react-navigation/native';
import CustomSearchInput from '../../components/CustomSearchInput';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCustomers,
  deleteCustomer,
} from '../../redux/thunks/customer.thunk';
import {customersList} from '../../redux/selectors/customer.selector';

const CustomerManager = () => {
  const [modaVisible, setModaVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const customers = useSelector(customersList);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  const onGotoUpdteCustomer = () => {
    navigation.navigate('UpdateCustomer');
  };

  const handleDeleteCustomer = id => {
    Alert.alert(
      'Xóa dữ liệu',
      'Bạn có muốn xóa không?',
      [
        {
          text: 'Thoát',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => dispatch(deleteCustomer(id))},
      ],
      {cancelable: false},
    );
    dispatch(fetchCustomers());
  };

  const showModal = item => {
    setSelectedItem(item);
    setModaVisible(true);
  };

  const FlatListItem = ({item, showModal}) => {
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
            <CustomButton
              style={styles.button}
              onPress={() => handleDeleteCustomer(item.id)}>
              Xóa
            </CustomButton>
          </View>
        </ScrollView>
        <Pressable onPress={() => showModal(item)}>
          <IconMeterial
            name="account-details"
            size={20}
            color={Colors.PRIMARY}
          />
        </Pressable>
        <Modal
          animationType="fade"
          visible={modaVisible}
          onRequestClose={() => setModaVisible(false)}>
          <View style={styles.modalHeader}>
            <Pressable
              style={styles.buttonBack}
              onPress={() => setModaVisible(false)}>
              <Ionicons name="chevron-back" size={20} style={styles.icon} />
              <Text style={styles.textModalHeader}>Quay lại</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalItem}>
                Tên khách hàng : {selectedItem && selectedItem.value.name}
              </Text>
              <Text style={styles.modalItem}>
                Địa chỉ : {selectedItem && selectedItem.value.address}
              </Text>
              <Text style={styles.modalItem}>
                Số ĐT: {selectedItem && selectedItem.value.phone}
              </Text>
              <Text style={styles.modalItem}>
                Ngày lắp đặt:{' '}
                {selectedItem && selectedItem.value.installationDate}
              </Text>
              <Text style={styles.modalItem}>
                Loại thang: {selectedItem && selectedItem.value.category}
              </Text>
              <Text style={styles.modalItem}>
                Mô tả: {selectedItem && selectedItem.value.description}
              </Text>
            </View>
          </ScrollView>
          <FooterCustom />
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomSearchInput />
      <View style={styles.flatListRender}>
        <FlatList
          data={customers}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <FlatListItem item={item} index={index} showModal={showModal} />
            );
          }}></FlatList>
      </View>
    </View>
  );
};

export default CustomerManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    padding: 10,
    margin: 10,
    borderRadius: 8,
    justifyContent: 'space-between',
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
    color: Colors.BACKDROP,
  },
  textTitleDetail: {
    color: Colors.PRIMARY,
  },
  textDate: {
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
  },
  textDetail: {
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
  },
  flatListItem: {},
  headerJob: {},
  buttonActiveContainer: {
    flexDirection: 'row',
    margin: 5,
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
    color: Colors.BLACK,
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
    marginLeft: 5,
  },
});
