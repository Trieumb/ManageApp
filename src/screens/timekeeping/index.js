import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

import Card from '../../components/Card';
import Colors from '../../config/constants/Colors';
import {scaleUI} from '../../config/constants/ScaleUI';
import TimeSection from './TimeSection';

const Timekeeping = () => {
  return (
    <View style={styles.screen}>
      <Calendar style={styles.calendar} />
      <Card shadow>
        <TimeSection title="Số ngày đi làm" value={0} color={Colors.SUCCESS} />
        <TimeSection title="Số ngày vắng" value={12} color={Colors.DANGER} />
        <TimeSection title="Số ngày nghỉ phép" value={5} color={Colors.BLUE} />
        <TimeSection
          title="Số ngày làm nửa ngày"
          value={32}
          color={Colors.YELLOW}
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
