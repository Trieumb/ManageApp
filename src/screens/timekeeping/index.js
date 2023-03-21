import {firebase} from '@react-native-firebase/database';
import dayjs from 'dayjs';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../components/Card';
import Colors, {TIME_KEEPING_COLORS} from '../../config/constants/Colors';
import Fonts from '../../config/constants/Fonts';
import {scaleUI} from '../../config/constants/ScaleUI';
import TimeKeepingModal from './TimeKeepingModal';
import TimeSection from './TimeSection';
import {userIdSelector} from '../../redux/selectors/auth.selector';
import {timekeepingListSelector} from '../../redux/selectors/timekeeping.selector';
import {
  getUserTimeKeepingByMonthThunk,
  writeNewTimeKeepingThunk,
} from '../../redux/thunks/timeKeeping.thunk';

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
var calendarDate;
const Timekeeping = () => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const monthData = useSelector(timekeepingListSelector);
  const [selectedDayData, setSelectedDayData] = useState({});
  const [isCheckDayModalVisible, setIsCheckDayModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState({});
  const [initRadioButtonsData, setInitRadioButtonsData] =
    useState(radioButtonsData);

  const [radioButtonsArrayState, setRadioButtonsArrayState] = useState([]);
  const [workingDays, setWorkingDays] = useState(0);
  const [absentDays, setAbsentDays] = useState(0);
  const [leaveDays, setLeaveDays] = useState(0);
  const [halfWorkingDays, setHalfWorkingDays] = useState(0);
  const [totalOvertime, setTotalOvertime] = useState(0);
  const [markedDatesData, setMarkedDatesData] = useState({});
  var _workingDays = 0;
  var _absentDays = 0;
  var _leaveDays = 0;
  var _halfWorkingDays = 0;
  var _totalOvertime = 0;

  useEffect(() => {
    const newDate = dayjs().format('YYYY-MM');
    console.log('userId', userId, 'date', newDate);
    calendarDate = newDate;

    dispatch(getUserTimeKeepingByMonthThunk({userUid: userId, month: newDate}));
  }, []);

  useEffect(() => {
    const markedDateList = monthData.reduce((acc, curr) => {
      acc[dayjs(`${calendarDate}-${curr.day}`).format('YYYY-MM-DD')] = {
        selected: true,
        selectedColor: TIME_KEEPING_COLORS[curr?.type],
      };
      return acc;
    }, {});
    console.log('markedDateList:', markedDateList);
    setMarkedDatesData(markedDateList);

    if (monthData?.length > 0) {
      _workingDays = monthData.reduce((acc, curr) => {
        if (curr?.type === 'working') {
          acc++;
        }
        return acc;
      }, 0);

      _absentDays = monthData.reduce((acc, curr) => {
        if (curr?.type === 'off') {
          acc++;
        }
        return acc;
      }, 0);

      _leaveDays = monthData.reduce((acc, curr) => {
        if (curr?.type === 'leave') {
          acc++;
        }
        return acc;
      }, 0);

      _halfWorkingDays = monthData.reduce((acc, curr) => {
        if (curr?.type === 'halfday') {
          acc++;
        }
        return acc;
      }, 0);

      _totalOvertime = monthData.reduce((acc, curr) => {
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
  }, [monthData]);

  const handleMonthChange = async date => {
    const newDate = dayjs(`${date.year}-${date.month}`).format('YYYY-MM');
    calendarDate = newDate;
    console.log('userId', userId, 'date', newDate);
    dispatch(getUserTimeKeepingByMonthThunk({userUid: userId, month: newDate}));
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

      const month = `${selectedDay.year}-${
        selectedDay.month < 10 ? '0' + selectedDay.month : selectedDay.month
      }`;
      const key = selectedDay.day - 1;
      const day = selectedDay.day;
      const type = selectedOption.value;
      const overtime = selectedOption.value === 'working' ? overtimeValue : 0;
      const timeKeepingData = {key, day, type, overtime};
      console.log('write data', month, timeKeepingData);
      dispatch(
        writeNewTimeKeepingThunk({userUid: userId, month, timeKeepingData}),
      );
      setSelectedDayData({...selectedDayData, type: selectedOption.value});
      return;
    },
    //[],
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
    const data = monthData.find(timeKeeping => {
      return timeKeeping.key == date.day - 1;
    });
    if (!data) {
      setSelectedDayData(null);
    } else {
      const {day, overtime, type} = data;
      setSelectedDayData({day, overtime, type});
    }

    if (data) {
      const newInitRadioButtonsData = radioButtonsData.map(item => {
        return item.value === data.type
          ? {...item, selected: true}
          : {...item, selected: false};
      });
      console.log('newInitRadioButtonsData,', newInitRadioButtonsData);
      setInitRadioButtonsData(newInitRadioButtonsData);
    } else {
      const newInitRadioButtonsData = radioButtonsData.map(item => {
        return {...item, selected: false};
      });
      console.log('newInitRadioButtonsData,', newInitRadioButtonsData);
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
