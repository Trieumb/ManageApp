import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  Pressable,
  Linking,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../config/constants/Colors';
import FontSize from '../config/constants/FontSize';
import Fonts from '../config/constants/Fonts';
import {logoutThunk} from '../redux/thunks/auth.thunks';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const handleFacebookLink = () => {
    dispatch(logoutThunk());
    console.log('LogedOut Success!');
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.container}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{backgroundColor: Colors.SECONDARY}}>
          <View style={styles.imageBakground}>
            <Text style={styles.author}>Xin chào! Trieumb</Text>
            <Image
              source={require('../assets/images/avata.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.listDrawerContainer}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
        <View style={styles.footer}>
          <Pressable style={styles.buttonFooter}>
            <View style={styles.buttonItem}>
              <Ionicons
                name="logo-facebook"
                size={20}
                color={Colors.PRIMARY_400}
              />
              <Text style={styles.textFooter}>ThangMayHaNoi</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch(logoutThunk());
            }}
            style={styles.buttonFooter}>
            <View style={styles.buttonItem}>
              <Ionicons name="exit-outline" size={20} />
              <Text style={styles.textFooter}>Đăng xuất</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: Colors.WHITE,
  },
  listDrawerContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop: 10,
    borderRadius: 8,
  },
  imageBakground: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  author: {
    color: Colors.BLACK,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: FontSize.BODY_18,
    marginRight: 20,
  },
  footer: {
    backgroundColor: 'transparent',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.SECONDARY,
  },
  buttonFooter: {
    paddingVertical: 10,
  },
  buttonItem: {
    flexDirection: 'row',
  },
  textFooter: {
    fontSize: FontSize.BODY,
    fontFamily: Fonts.POPPINS_BOLD,
  },
});
