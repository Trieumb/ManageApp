import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, StyleSheet, Pressable, FlatList, Modal} from 'react-native';
import CustomSearchInput from '../../components/CustomSearchInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors, {TIME_KEEPING_COLORS} from '../../config/constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {userListSelector} from '../../redux/selectors/users.selector';
import {getAllUsersThunk} from '../../redux/thunks/user.thunk';
import FontSize from '../../config/constants/FontSize';
import FooterCustom from '../../components/FooterCustom';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import TimeKeepingDetailModal from './UserTimekeepingDetailModal';
const DetaiEmployee = () => {
  const roleMap = {
    admin: 'Admin',
    manager: 'Manager',
    stock_manager: 'Stock Manager',
    accountant: 'Accountant',
    employee: 'Employee',
  };
  const dispatch = useDispatch();
  const userList = useSelector(userListSelector);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const showPicker = useCallback(value => setShow(value), []);
  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );
  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, []);

  const showModal = (item, date) => {
    console.log('show Modal');
    setSelectedItem(item);
    setModalVisible(true);
  };

  const FlatsListItem = ({item, index}) => {
    return (
      <View style={styles.FlatlistContainer}>
        <Text style={[styles.no, styles.item]}>{index + 1}</Text>
        <Text style={[styles.name, styles.item]}>{item.name}</Text>
        <Text style={[styles.role, styles.item]}>{roleMap[item.role]}</Text>
        <View style={styles.detailButton}>
          <Pressable
            style={styles.deleteIcon}
            onPress={() => {
              showModal(item, date);
            }}>
            <Ionicons name="list" size={24} color={Colors.PRIMARY_300} />
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <CustomSearchInput />
      <Text style={styles.title}>Danh sách nhân viên chấm công tháng</Text>
      <Pressable
        onPress={() => {
          showPicker(true);
        }}>
        <Text style={styles.monthText}>{moment(date).format('MM-YYYY')}</Text>
      </Pressable>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          okButton="Confirm"
          value={date}
          mode="number"
          minimumDate={new Date(1900, 1)}
          maximumDate={new Date(2099, 12)}
          locale="vi"
        />
      )}
      <FlatList
        data={userList}
        keyExtractor={item => item.name}
        renderItem={({item, index}) => (
          <FlatsListItem item={item} index={index} />
        )}
      />

      {modalVisible && (
        <TimeKeepingDetailModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedItem={selectedItem}
          date={date}
        />
      )}
    </View>
  );
};
export default DetaiEmployee;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.SUCCESS,
    fontSize: FontSize.BODY_18,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  monthText: {
    color: Colors.PRIMARY,
    fontSize: FontSize.BODY_18,
    justifyContent: 'center',
    paddingBottom: 10,
  },
  FlatlistContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    marginVertical: 2,
  },

  item: {
    marginVertical: 2,
    padding: 8,
    fontSize: FontSize.BODY,
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
    alignItems: 'center',
  },
  deleteIcon: {
    padding: 8,
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
    marginLeft: 5,
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
    color: TIME_KEEPING_COLORS.halfday,
  },
  overTime: {
    color: Colors.PRIMARY,
  },
});
