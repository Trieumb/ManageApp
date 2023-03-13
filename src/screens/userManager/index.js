import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import Colors from '../../config/constants/Colors';
import Fonts from '../../config/constants/Fonts';
import FontSize from '../../config/constants/FontSize';

import UserItem from './UserItem';
import {useDispatch, useSelector} from 'react-redux';
import {userListSelector} from '../../redux/selectors/users.selector';
import {getAllUsersThunk} from '../../redux/thunks/user.thunk';
import {useNavigation} from '@react-navigation/native';
import {startEditUser} from '../../redux/reducers/user.slice';

const UserManager = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userList = useSelector(userListSelector);
  const handlePressCard = (id, name, email, role) => {
    console.log('On press card', id, name, email, role);
    navigation.navigate('EditUser', {id, name, email, role});
    dispatch(startEditUser({uid: id, name, email, role}));
  };
  const handlePressDelete = id => {
    console.log('On press delete', id);
  };
  useEffect(() => {
    console.log('getAllUsersThunk');
    dispatch(getAllUsersThunk());
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <UserItem
            name={item.name}
            id={item.uid}
            role={item.role}
            email={item.email}
            onPressCard={handlePressCard}
            onPressDelete={handlePressDelete}
          />
        )}
      />
      <View style={styles.buttonAddContainer}>
        <Pressable onPress={() => {}} style={styles.addButton}>
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY,
  },
  a: {
    flexDirection: 'row',
  },
  flatListContainer: {
    backgroundColor: Colors.WHITE,
    padding: 10,

    borderRadius: 8,
    justifyContent: 'space-between',
  },
  buttonAddContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  addText: {
    color: Colors.WHITE,
    fontSize: FontSize.H5,
  },
});
export default UserManager;
