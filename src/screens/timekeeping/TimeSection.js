import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../../config/constants/Colors';
import Fonts from '../../config/constants/Fonts';
import FontSize from '../../config/constants/FontSize';

const TimeSection = ({title, value, color}) => {
  const sectionColor = {color};

  return (
    <View style={styles.container}>
      <Text style={[styles.title, sectionColor]}>{title}:</Text>
      <Text style={(styles.value, sectionColor)}>{value}</Text>
    </View>
  );
};

export default TimeSection;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.PRIMARY_100,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
  },
  value: {
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
    textAlign: 'right',
  },
});
