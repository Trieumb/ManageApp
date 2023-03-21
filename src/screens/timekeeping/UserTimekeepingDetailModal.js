import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, StyleSheet, Pressable, Modal} from 'react-native';
import Colors, {TIME_KEEPING_COLORS} from '../../config/constants/Colors';
import FontSize from '../../config/constants/FontSize';
import FooterCustom from '../../components/FooterCustom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {getUserTimeKeepingByMonth} from './../../config/api/TimeKeepingAPI';
const TimeKeepingDetailModal = props => {
  const {modalVisible, setModalVisible, selectedItem, date} = props;
  const [userMonthData, setUserMonthData] = useState([]);
  const [workingDays, setWorkingDays] = useState(0);
  const [absentDays, setAbsentDays] = useState(0);
  const [leaveDays, setLeaveDays] = useState(0);
  const [halfWorkingDays, setHalfWorkingDays] = useState(0);
  const [totalOvertime, setTotalOvertime] = useState(0);
  var _workingDays = 0;
  var _absentDays = 0;
  var _leaveDays = 0;
  var _halfWorkingDays = 0;
  var _totalOvertime = 0;

  const roleMap = {
    admin: 'Admin',
    manager: 'Manager',
    stock_manager: 'Stock Manager',
    accountant: 'Accountant',
    employee: 'Employee',
  };

  useEffect(() => {
    const fetchTimeKeeping = async () => {
      const userId = selectedItem.uid;
      const dateStr = moment(date).format('YYYY-MM');
      const userTimeKeeping = await getUserTimeKeepingByMonth({
        userUid: userId,
        month: dateStr,
      });

      setUserMonthData(userTimeKeeping.monthTimeKeepingList);
    };
    fetchTimeKeeping().catch(console.error);
  }, []);

  useEffect(() => {
    if (userMonthData?.length > 0) {
      _workingDays = userMonthData.reduce((acc, curr) => {
        if (curr?.type === 'working') {
          acc++;
        }
        return acc;
      }, 0);

      _absentDays = userMonthData.reduce((acc, curr) => {
        if (curr?.type === 'off') {
          acc++;
        }
        return acc;
      }, 0);

      _leaveDays = userMonthData.reduce((acc, curr) => {
        if (curr?.type === 'leave') {
          acc++;
        }
        return acc;
      }, 0);

      _halfWorkingDays = userMonthData.reduce((acc, curr) => {
        if (curr?.type === 'halfday') {
          acc++;
        }
        return acc;
      }, 0);

      _totalOvertime = userMonthData.reduce((acc, curr) => {
        acc += curr.overtime;
        return acc;
      }, 0);
    } else {
      _absentDays = 0;
      _workingDays = 0;
      _leaveDays = 0;
      _halfWorkingDays = 0;
      _totalOvertime = 0;
    }
    setWorkingDays(_workingDays);
    setAbsentDays(_absentDays);
    setLeaveDays(_leaveDays);
    setHalfWorkingDays(_halfWorkingDays);
    setTotalOvertime(_totalOvertime);
  }, [userMonthData]);

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.modalHeader}>
        <Pressable
          style={styles.buttonBack}
          onPress={() => {
            console.log('RequestClose:');
            setModalVisible(false);
          }}>
          <Ionicons name="chevron-back" size={20} style={styles.icon} />
          <Text style={styles.textModalHeader}>Quay lại</Text>
        </Pressable>
      </View>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalItem}>
            Tên nhân viên : {selectedItem && selectedItem.name}
          </Text>
          <Text style={styles.modalItem}>
            Vị trí : {selectedItem && roleMap[selectedItem.role]}
          </Text>
          <Text style={[styles.working, styles.modalItem]}>
            Số ngày đi làm: {workingDays}
          </Text>
          <Text style={[styles.off, styles.modalItem]}>
            Số ngày vắng: {absentDays}
          </Text>
          <Text style={[styles.leave, styles.modalItem]}>
            Số ngày nghỉ phép: {leaveDays}
          </Text>
          <Text style={[styles.halfday, styles.modalItem]}>
            Số ngày làm nửa ngày: {halfWorkingDays}
          </Text>
          <Text style={[styles.overTime, styles.modalItem]}>
            Số giờ tăng ca: {totalOvertime}
          </Text>
        </View>
      </View>
      <FooterCustom />
    </Modal>
  );
};
export default TimeKeepingDetailModal;
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
