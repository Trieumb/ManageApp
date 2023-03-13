import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import BigCustomButton from '../../components/BigCustomButton';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';
import CustomButtonBack from '../../components/CustomButtonBack';
import Colors from '../../config/constants/Colors';
import Fonts from '../../config/constants/Fonts';
import FontSize from '../../config/constants/FontSize';
import {useNavigation} from '@react-navigation/native';
import LineHeight from '../../config/constants/LineHeight';
import {WINDOW_WITH} from './../../config/constants/DimensionsWindown';
import {writeUserThunk} from '../../redux/thunks/user.thunk';
import HeaderCustom from '../../components/HeaderCustom';
import {useDispatch, useSelector} from 'react-redux';
const EditUser = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.users.isLoading);
  const edittingUser = useSelector(state => state.users.editingUser);
  const isDataWritten = useSelector(state => state.users.isDataWritten);

  const {id, name, email} = route.params;
  const [role, setRole] = useState(route.params.role);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleSaveUser = async (uid, name, email, role) => {
    console.log('data: ', uid, name, email, role);
    const data = {uid, name, email, role};
    dispatch(writeUserThunk(data));
  };
  const onGotoBack = () => {
    navigation.navigate('HomeNavigator');
  };
  let form = {edittingUser} && (
    <View>
      <ScrollView style={styles.body}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên:</Text>
          <Text style={styles.textVal}>{name}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.textVal}>{email}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Role:</Text>

          <View style={styles.pickerContainer}>
            <Picker
              style={{
                margin: -10,
              }}
              selectedValue={role}
              onValueChange={value => setRole(value)}>
              <Picker.Item label="Admin" value="admin" />
              <Picker.Item label="Manager" value="manager" />
              <Picker.Item label="Stock Manager" value="stock_manager" />
              <Picker.Item label="Accountant" value="accountant" />
              <Picker.Item label="Employee" value="employee" />
            </Picker>
          </View>
        </View>
        <BigCustomButton
          disable={false}
          onPress={() => {
            handleSaveUser(id, name, email, role);
          }}>
          Xác nhận
        </BigCustomButton>
      </ScrollView>
      <View style={styles.footer}></View>
    </View>
  );

  if (!edittingUser && isDataWritten && !isLoading) {
    form = (
      <View style={styles.form}>
        <Text style={styles.notiText}>Cập nhật thông tin thành cồng</Text>
        <BigCustomButton disable={isLoading} onPress={onGotoBack}>
          Go back
        </BigCustomButton>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.HEADER}
        translucent={true}
      />
      <ImageBackground style={styles.header}>
        <CustomButtonBack onPress={onGotoBack} />
        <Text style={styles.textHeader}>Cập nhật người dùng</Text>
      </ImageBackground>
      <View style={styles.formContainer}>{form}</View>
    </View>
  );
};

export default EditUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    backgroundColor: Colors.HEADER,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '15%',
    paddingTop: 30,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  textHeader: {
    color: Colors.PRIMARY,
    fontSize: FontSize.BODY_18,
    padding: 8,
    lineHeight: LineHeight.BODY,
  },
  body: {
    flex: 1,
  },
  titleBody: {
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: FontSize.H5,
    paddingBottom: 20,
    color: Colors.PRIMARY,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: WINDOW_WITH - 60,
    backgroundColor: '#d3d3d3',
    borderColor: Colors.SECONDARY,
    borderWidth: 0.5,
    borderRadius: 20,
    marginVertical: 5,
    padding: 15,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  pickerContainer: {
    alignContent: 'center',
    flex: 0.8,
  },

  label: {
    flex: 0.2,
    fontSize: 18,
  },
  textVal: {
    flex: 0.8,
    fontSize: 18,
    paddingLeft: 10,
  },
  footer: {
    height: '15%',
    width: '100%',
    backgroundColor: Colors.HEADER,
  },
});
