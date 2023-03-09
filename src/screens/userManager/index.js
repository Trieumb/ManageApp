import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Pressable,
} from 'react-native';
import Colors from '../../config/constants/Colors';
import Fonts from '../../config/constants/Fonts';
import FontSize from '../../config/constants/FontSize';

import UserItem from './UserItem';
const UserManager = () => {
  const initialUserList = [
    {
      id: 'id_1',
      name: 'PHAN VAN MINH',
      email: 'minhbka@gmail.com',
      role: 'employee',
    },
    {
      id: 'id_2',
      name: 'NGUYEN VAN TRIEU',
      email: 'minhbka@gmail.com',
      role: 'admin',
    },
  ];
  const [userList, setUserList] = useState(initialUserList);

  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <UserItem
            name={item.name}
            id={item.id}
            role={item.role}
            email={item.email}
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
