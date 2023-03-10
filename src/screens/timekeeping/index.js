import {firebase} from '@react-native-firebase/database';
import dayjs from 'dayjs';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Card from '../../components/Card';
import Colors, {TIME_KEEPING_COLORS} from '../../config/constants/Colors';
import Fonts from '../../config/constants/Fonts';
import {scaleUI} from '../../config/constants/ScaleUI';
import TimeKeepingModal from './TimeKeepingModal';
import TimeSection from './TimeSection';
import Api_URL from '../../config/api/Api_URL';

// NOTE: PLEASE CHANGE IT WITH USERID FROM AUTH REDUX
// mock user id
const userId = '45wU1ds665gllQ4TYciuABKrZYc2';

const db = firebase.app().database(Api_URL);

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

const Timekeeping = () => {
  const [monthData, setMonthData] = useState([]);
  const [selectedDayData, setSelectedDayData] = useState({});
  const [markedDatesData, setMarkedDatesData] = useState({});
  const [isCheckDayModalVisible, setIsCheckDayModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState({});
  const [initRadioButtonsData, setInitRadioButtonsData] =
    useState(radioButtonsData);

  const [radioButtonsArrayState, setRadioButtonsArrayState] = useState([]);

  useEffect(() => {
    const checkAndCreateMonthData = async () => {
      const newDate = dayjs().format('YYYY-MM');

      const data = await db
        .ref(`timekeeping/${userId}/${newDate}`)
        .once('value');
      let monthResData = data.val();

      if (!monthResData) {
        const numDays = dayjs(
          `${dayjs().get('year')}-${dayjs().get('month') + 1}`,
          'YYYY-MM',
        ).daysInMonth();

        monthResData = [];

        for (let i = 0; i < numDays; i++) {
          monthResData.push({
            day: i + 1,
            overtime: 0,
            type: 'working',
          });
        }

        await db.ref(`timekeeping/${userId}/${newDate}`).set(monthResData);
      }

      const transformMonthData = monthResData.reduce((acc, curr) => {
        acc[dayjs(`${newDate}-${curr.day}`).format('YYYY-MM-DD')] = {
          selected: true,
          selectedColor: TIME_KEEPING_COLORS[curr.type],
        };
        return acc;
      }, {});

      setMarkedDatesData(transformMonthData);
      setMonthData(monthResData);
    };
    checkAndCreateMonthData();
  }, []);

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

  const totalOvertime = useMemo(() => {
    if (monthData?.length > 0) {
      return monthData.reduce((acc, curr) => {
        acc += curr.overtime;
        return acc;
      }, 0);
    }
    return 0;
  }, [monthData]);

  const handleMonthChange = async date => {
    const newDate = dayjs(`${date.year}-${date.month}`).format('YYYY-MM');

    const data = await db.ref(`timekeeping/${userId}/${newDate}`).once('value');
    let monthResData = data.val();

    if (!monthResData) {
      const numDays = dayjs(
        `${date.year}-${date.month}`,
        'YYYY-MM',
      ).daysInMonth();

      monthResData = [];

      for (let i = 0; i < numDays; i++) {
        monthResData.push({
          day: i + 1,
          overtime: 0,
          type: 'working',
        });
      }

      await db.ref(`timekeeping/${userId}/${newDate}`).set(monthResData);
    }

    const transformMonthData = monthResData.reduce((acc, curr) => {
      acc[dayjs(`${newDate}-${curr.day}`).format('YYYY-MM-DD')] = {
        selected: true,
        selectedColor: TIME_KEEPING_COLORS[curr.type],
      };
      return acc;
    }, {});

    setMarkedDatesData(transformMonthData);
    setMonthData(monthResData);
  };

  const handleOpenModal = useCallback(() => {
    setIsCheckDayModalVisible(true);
  }, []);

  const handleUpdateSelectedDayData = useCallback(
    async (radioButtonsArray, overtimeValue) => {
      console.log('202: ', overtimeValue);
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
            `timekeeping/${userId}/${selectedDay.year}-${
              selectedDay.month < 10
                ? '0' + selectedDay.month
                : selectedDay.month
            }/${selectedDay.day - 1}`,
          )
          .set({
            day: selectedDay.day,
            type: selectedOption.value,
            overtime: selectedOption.value === 'working' ? overtimeValue : 0,
          });

        setSelectedDayData({...selectedDayData, type: selectedOption.value});

        return;
      }

      // cập nhật trên Firebase
      await db
        .ref(
          `timekeeping/${userId}/${selectedDay.year}-${
            selectedDay.month < 10 ? '0' + selectedDay.month : selectedDay.month
          }/${selectedDay.day - 1}`,
        )
        .update({
          type: selectedOption.value,
          overtime: selectedOption.value === 'working' ? overtimeValue : 0,
        });

      await handleMonthChange(selectedDay);

      setSelectedDayData({...selectedDayData, type: selectedOption.value});
    },
    [selectedDay, selectedDayData],
  );

  const handleCloseModal = useCallback(
    async overtimeValue => {
      await handleUpdateSelectedDayData(radioButtonsArrayState, overtimeValue);
      setIsCheckDayModalVisible(false);
    },
    [handleUpdateSelectedDayData, radioButtonsArrayState],
  );

  const showCheckDayModal = async date => {
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

    if (data && data?.val()) {
      const newInitRadioButtonsData = radioButtonsData.map(item => {
        return item.value === data.val().type
          ? {...item, selected: true}
          : {...item, selected: false};
      });

      setInitRadioButtonsData(newInitRadioButtonsData);
    }

    setSelectedDay(date);
    handleOpenModal();
  };

  const onPressRadioButton = radioButtonsArray => {
    setRadioButtonsArrayState(radioButtonsArray);
  };

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
          value={totalOvertime}
          color={Colors.PRIMARY}
        />
      </Card>
      {/* Modal */}
      <TimeKeepingModal
        isCheckDayModalVisible={isCheckDayModalVisible}
        closeCheckDayModal={handleCloseModal}
        selectedDayData={selectedDayData}
        selectedDay={selectedDay}
        initRadioButtonsData={initRadioButtonsData}
        onPressRadioButton={onPressRadioButton}
      />
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
