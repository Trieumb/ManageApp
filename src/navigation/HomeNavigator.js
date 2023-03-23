import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TimeKeepingNavigation from './TimeKeepingNavigator';
import UserManager from '../screens/userManager';
import CustomDrawer from '../components/CustomDrawer';
import Colors from '../config/constants/Colors';
import FontSize from '../config/constants/FontSize';
import Fonts from '../config/constants/Fonts';
import JobNavigation from './JobNavigator';
import CustomerNavigation from './CustomerNavigator';
import InventoryNavigation from './InventoryNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { userIdSelector } from '../redux/selectors/auth.selector';
import { user } from '../redux/selectors/users.selector';
import { getInfoUserByIdThunk } from '../redux/thunks/user.thunk';

const Drawer = createDrawerNavigator();

const HomeNavigator = () => {


  const userId = useSelector(userIdSelector);
  const data = useSelector(user);
  const dispatch = useDispatch();

  const isEmployee = data && data?.role === 'employee';
  const isStockManager = data && data?.role === 'stock_manager';

  useEffect(() => {
    dispatch(getInfoUserByIdThunk(userId));
    console.log(isEmployee);
  }, [userId]);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: Colors.PRIMARY,
        drawerActiveTintColor: Colors.WHITE,
        drawerInactiveTintColor: Colors.BACKDROP,
        drawerLabelStyle: {
          marginLeft: 5,
          fontFamily: Fonts.POPPINS,
          fontSize: FontSize.BODY_18,
        },
        headerStyle: {
          backgroundColor: Colors.BG,
          elevation: 3,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: Colors.PRIMARY,
          fontFamily: Fonts.POPPINS,
          fontSize: FontSize.H5,
        },
      }}>
      <Drawer.Screen
        name="Quản lý công việc"
        component={JobNavigation}
      />
      {isEmployee || isStockManager ? null : (
        <Drawer.Screen
          name="Quản lý khách hàng"
          component={CustomerNavigation}
        />
      )}
      {isEmployee ? null : (
        <Drawer.Screen
          name="Quản lý kho"
          component={InventoryNavigation}
        />
      )}

      {isEmployee || isStockManager ? null : (
        <Drawer.Screen
          name="Tài khoản"
          component={UserManager}
        />
      )}
      <Drawer.Screen
        name="Chấm công nhân viên"
        component={TimeKeepingNavigation}
      />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;
