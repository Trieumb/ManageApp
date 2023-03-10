import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RadioGroup} from 'react-native-radio-buttons-group';
import Colors from '../../config/constants/Colors';
import Fonts from '../../config/constants/Fonts';

const TimeKeepingModal = ({
  isCheckDayModalVisible,
  closeCheckDayModal,
  onPressRadioButton,
  selectedDay,
  selectedDayData,
  initRadioButtonsData,
}) => {
  const selectedOption = initRadioButtonsData.find(
    item => item.selected === true,
  );

  const [overtime, setOvertime] = useState(selectedDayData?.overtime);

  const handleChangeText = text => {
    setOvertime(+text);
  };

  useEffect(() => {
    if (selectedOption?.value !== 'working') {
      setOvertime(0);
    }
  }, [selectedOption?.value]);

  return (
    <Modal
      visible={isCheckDayModalVisible}
      onRequestClose={() => closeCheckDayModal(overtime)}
      transparent>
      <View style={styles.modalBackground}>
        <TouchableOpacity
          style={styles.layer}
          onPress={() => closeCheckDayModal(overtime)}
        />
        <View style={styles.modalContainer}>
          <View style={styles.info}>
            <Text style={styles.selectedDate}>
              Date: {selectedDay.dateString}
            </Text>
            <View style={styles.radioContainer}>
              <RadioGroup
                containerStyle={styles.radio}
                radioButtons={initRadioButtonsData}
                onPress={onPressRadioButton}
              />
            </View>
            <View style={styles.overtimeContainer}>
              <TextInput
                onChangeText={handleChangeText}
                editable={selectedOption?.value === 'working'}
                keyboardType="decimal-pad"
                style={styles.input}
                placeholder="Nhập số giờ tăng ca"
                defaultValue={overtime?.toString()}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => closeCheckDayModal(overtime)}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TimeKeepingModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    minWidth: 300,
    minHeight: 400,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  layer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.POPPINS,
    textAlign: 'center',
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
