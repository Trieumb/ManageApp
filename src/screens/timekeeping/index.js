import {firebase} from '@react-native-firebase/database';
import dayjs from 'dayjs';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import RadioGroup from 'react-native-radio-buttons-group';
import Card from '../../components/Card';
import Colors, {TIME_KEEPING_COLORS} from '../../config/constants/Colors';
import Fonts from '../../config/constants/Fonts';
import {scaleUI} from '../../config/constants/ScaleUI';
import TimeSection from './TimeSection';


// const userId = useSelector(userIdSelector);

const userId = "c9GKUPPv1aQ3gHb1hqUethHLMAo2";
console.log(userId);

const db = firebase
  .app()
  .database(
    'https://managerapp-41d45-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );

const radioButtonsData = [
  {
    id: '1',
    label: 'Đi làm',
    value: 'working',
  },
  {
    id: '2',
    label: 'Nghỉ không phép',
    value: 'off',
  },
  {
    id: '3',
    label: 'Nghỉ có phép',
    value: 'leave',
  },
  {
    id: '4',
    label: 'Làm nửa ngày',
    value: 'halfday',
  },
];

const getDateNow = () => {
  return dayjs().format('YYYY-MM-DD');
};

const Timekeeping = () => {
  const [monthData, setMonthData] = useState([]);
  const [selectedDayData, setSelectedDayData] = useState({});
  const [markedDatesData, setMarkedDatesData] = useState({});
  const [isCheckDayModalVisible, setIsCheckDayModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});

  const getInitSelectedRadioBtn = useCallback(
    () =>
      radioButtonsData.map(item => {
        return item.value === selectedDayData?.type
          ? {...item, selected: true}
          : item;
      }),
    [selectedDayData],
  );

  const [radioButtons, setRadioButtons] = useState(getInitSelectedRadioBtn);

  useEffect(() => {
    if (isCheckDayModalVisible) {
      console.log('run 72');
      setRadioButtons(getInitSelectedRadioBtn);
    }
  }, [isCheckDayModalVisible]);

  const workingDays = useMemo(() => {
    if (monthData?.length > 0) {
      return monthData.reduce((acc, curr) => {
        if (curr.type === 'working') {
          acc++;
        }
        return acc;
      }, 0);
    }
    return 0;
  }, [monthData]);

  const absentDays = useMemo(() => {
    if (monthData?.length > 0) {
      return monthData.reduce((acc, curr) => {
        if (curr.type === 'off') {
          acc++;
        }
        return acc;
      }, 0);
    }
    return 0;
  }, [monthData]);

  const leaveDays = useMemo(() => {
    if (monthData?.length > 0) {
      return monthData.reduce((acc, curr) => {
        if (curr.type === 'leave') {
          acc++;
        }
        return acc;
      }, 0);
    }
    return 0;
  }, [monthData]);

  const halfWorkingDays = useMemo(() => {
    if (monthData?.length > 0) {
      return monthData.reduce((acc, curr) => {
        if (curr.type === 'halfday') {
          acc++;
        }
        return acc;
      }, 0);
    }
    return 0;
  }, [monthData]);

  const handleMonthChange = ({year, month}) => {
    const newDate = dayjs(`${year}-${month}`).format('YYYY-MM');

    db.ref(`timekeeping/${userId}/${newDate}`).on('value', snapshot => {
      if (snapshot?.val()?.length > 0) {
        const transformMonthData = snapshot?.val()?.reduce((acc, curr) => {
          acc[dayjs(`${newDate}-${curr.day}`).format('YYYY-MM-DD')] = {
            selected: true,
            selectedColor: TIME_KEEPING_COLORS[curr.type],
          };
          return acc;
        }, {});
        setMarkedDatesData(transformMonthData);
      } else {
        setMarkedDatesData({});
      }
      setMonthData(snapshot?.val());
    });
  };

  const showCheckDayModal = async date => {
    console.log('checkday');
    const data = await db
      .ref(
        `timekeeping/${userId}/${date.year}-${
          date.month < 10 ? '0' + date.month : date.month
        }/${date.day - 1}`,
      )
      .once('value');

    if (!data) {
      selectedDayData(null);
    } else {
      setSelectedDayData(data.val());
    }

    setSelectedDate(date);
    setIsCheckDayModalVisible(true);
  };

  const closeCheckDayModal = () => {
    setIsCheckDayModalVisible(false);
    setSelectedDayData({});
  };

  const onPressRadioButton = async radioButtonsArray => {
    // lâý type được selectedselecFirebase
    const selectedOption = radioButtonsArray.find(
      item => item.selected === true,
    );

    if (!selectedOption) {
      return;
    }

    // Tạo mới date date nếu chưa có trên Firebase
    if (!selectedDayData) {
      await db
        .ref(
          `timekeeping/${userId}/${selectedDate.year}-${
            selectedDate.month < 10
              ? '0' + selectedDate.month
              : selectedDate.month
          }/${selectedDate.day - 1}`,
        )
        .set({
          day: selectedDate.day,
          type: selectedOption.value,
          overtime: 0,
        });
      setSelectedDayData({...selectedDayData, type: selectedOption.value});

      return;
    }

    // cập nhật trên Firebase
    await db
      .ref(
        `timekeeping/${userId}/${selectedDate.year}-${
          selectedDate.month < 10
            ? '0' + selectedDate.month
            : selectedDate.month
        }/${selectedDate.day - 1}`,
      )
      .update({
        type: selectedOption.value,
      });
    setSelectedDayData({...selectedDayData, type: selectedOption.value});
  };

  const onUpdateDate = () => {};

  return (
    <View style={styles.screen}>
      <Calendar
        hideExtraDays
        markedDates={markedDatesData}
        style={styles.calendar}
        onDayPress={showCheckDayModal}
        onMonthChange={handleMonthChange}
      />
      <Card shadow>
        <TimeSection
          title="Số ngày đi làm"
          value={workingDays}
          color={TIME_KEEPING_COLORS.working}
        />
        <TimeSection
          title="Số ngày vắng"
          value={absentDays}
          color={TIME_KEEPING_COLORS.off}
        />
        <TimeSection
          title="Số ngày nghỉ phép"
          value={leaveDays}
          color={TIME_KEEPING_COLORS.leave}
        />
        <TimeSection
          title="Số ngày làm nửa ngày"
          value={halfWorkingDays}
          color={TIME_KEEPING_COLORS.halfday}
        />
        <TimeSection
          title="Số giờ tăng ca"
          value={46.5}
          color={Colors.PRIMARY}
        />
      </Card>

      <Modal
        visible={isCheckDayModalVisible}
        onRequestClose={() => setIsCheckDayModalVisible(false)}
        transparent>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => closeCheckDayModal()}>
          <View style={styles.modalContainer}>
            <Text style={styles.selectedDate}>
              Date: {selectedDate.dateString}
            </Text>
            <View style={styles.radioContainer}>
              <RadioGroup
                containerStyle={styles.radio}
                radioButtons={radioButtons}
                onPress={onPressRadioButton}
              />
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={onUpdateDate}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Timekeeping;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  calendar: {
    minHeight: scaleUI(380, true),
    elevation: 4,
    shadowColor: Colors.PRIMARY,
    marginBottom: 16,
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDate: {
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 18,
  },
  radioContainer: {
    marginVertical: 16,
  },
  radio: {
    alignItems: 'flex-start',
  },
});
