import React, {useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {WINDOW_WITH} from '../config/constants/DimensionsWindown';
import Colors from '../config/constants/Colors';
import FontSize from '../config/constants/FontSize';
import Fonts from '../config/constants/Fonts';

const CustomInput = ({
  resetInput,
  keyboardType,
  defaultValue,
  reset,
  type,
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  useEffect(() => {
    if (resetInput) {
      reset();
    }
  }, [resetInput]);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : Colors.SECONDARY},
            ]}>
            <TextInput
              keyboardType={keyboardType}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              defaultValue={defaultValue}
              type={type}
              placeholder={placeholder}
              placeholderTextColor={Colors.BLACK_O2}
              style={styles.input}
              autoCapitalize="none"
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={styles.textError}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    width: WINDOW_WITH - 60,
    borderColor: Colors.SECONDARY,
    borderWidth: 0.5,
    borderRadius: 20,
    marginVertical: 5,
  },
  input: {
    paddingLeft: 10,
    fontFamily: Fonts.POPPINS,
    fontSize: FontSize.BODY,
    color: Colors.BLACK,
  },
  textError: {
    color: Colors.DANGER,
    marginLeft: 30,
    paddingVertical: 2,
    alignSelf: 'stretch',
  },
});

export default CustomInput;
