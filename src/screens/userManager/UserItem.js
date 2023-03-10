import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontSize from '../../config/constants/FontSize';
import Fonts from '../../config/constants/Fonts';
import Colors from '../../config/constants/Colors';
const UserItem = ({id, name, email, role}) => {
  return (
    <View style={styles.itemContainer}>
      <Icon name="user" size={80} color={Colors.PRIMARY} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.aux}>Email: {email}</Text>
        <Text style={styles.aux}>Role: {role}</Text>
      </View>
      <View style={styles.deleteContainer}>
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => {
            console.log('On Delete', id);
          }}>
          <Icon name="trash" size={24} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
  },
  infoContainer: {
    paddingLeft: 10,
    flex: 1,
  },
  title: {
    color: Colors.PRIMARY,
    fontSize: FontSize.H4,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  aux: {
    fontSize: FontSize.BODY,
    color: Colors.PRIMARY_900,
  },
  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    backgroundColor: Colors.DANGER,
    padding: 5,
    borderRadius: 5,
  },
});

export default UserItem;
