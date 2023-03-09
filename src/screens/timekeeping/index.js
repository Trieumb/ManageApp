import {firebase} from '@react-native-firebase/database';
import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import dayjs from 'dayjs';

import Card from '../../components/Card';
import Colors, {TIME_KEEPING_COLORS} from '../../config/constants/Colors';
import {scaleUI} from '../../config/constants/ScaleUI';
import TimeSection from './TimeSection';

// mock user id
const userId = '45wU1ds665gllQ4TYciuABKrZYc2';

const getDateNow = () => {
  return dayjs().format('YYYY-MM-DD');
};

const Timekeeping = () => {
  const [monthData, setMonthData] = useState([]);
  const [markedDatesData, setMarkedDatesData] = useState({});

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

    firebase
      .app()
      .database(
        'https://managerapp-41d45-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`timekeeping/${userId}/${newDate}`)
      .on('value', snapshot => {
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

  return (
    <View style={styles.screen}>
      <Calendar
        hideExtraDays
        markedDates={markedDatesData}
        style={styles.calendar}
        onDayPress={() => {
          console.log('show day modal');
        }}
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
});
