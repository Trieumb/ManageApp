import React, { useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import CustomSearchInput from '../../components/CustomSearchInput';
import Colors from '../../config/constants/Colors';
import FontSize from '../../config/constants/FontSize';

const dataWarahouse = [
  {
    "id": 1,
    "code": "TD01",
    'name': "Tủ điện 600x400",
    'quantity': 12,
  },
  {
    "id": 2,
    "code": "RL01",
    'name': "Role Index 4 chân",
    'quantity': 30,
  },
  {
    "id": 3,
    "code": "CKGB01",
    'name': "Gối bi 45",
    'quantity': 10,
  },
  {
    "id": 4,
    "code": "CKGB01",
    'name': "Gối bi 45",
    'quantity': 10,
  }
]

const InventoryManager = () => {

  const FlatListItem = ({ item, index }) => {
    return (
      <View style={{
        backgroundColor: index % 2 == 1 ? Colors.HEADER : Colors.WHITE,
        padding: 10, flexDirection: 'row', justifyContent: 'center'
      }}>
        <Text style={styles.flatListItem}>{item.code}</Text>
        <Text style={styles.flatListItemName}>{item.name}</Text>
        <Text style={styles.flatListItem}>{item.quantity}</Text>
      </View>
    )
  };
  const HeaderFlatList = () => {
    return (
      <View style={styles.flatListTitle}>
        <Text style={styles.flatListItemHeader}>Mã VT</Text>
        <Text style={styles.flatListItemHeaderName}>Tên VT</Text>
        <Text style={styles.flatListItemHeader}>Số lượng</Text>
      </View>
    )
  };
 
  return (
    <View>
      <CustomSearchInput/>
      <View style={styles.flarListContainer}>
        <FlatList data={dataWarahouse}
          ListHeaderComponent={HeaderFlatList}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index} />
          }}>
        </FlatList>
      </View>
    </View>

  )
}

export default InventoryManager

const styles = StyleSheet.create({
  flarListContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flatListItem: {
    paddingVertical: 10,
    width: "25%",
    fontSize: FontSize.BODY,
  },
  flatListItemName: {
    paddingVertical: 10,
    width: "45%",
    fontSize: FontSize.BODY,
  },
  flatListTitle: {
    flexDirection: 'row',
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    justifyContent: 'center',
  },
  flatListItemHeader: {
    color: Colors.WHITE,
    fontSize: FontSize.BODY_18,
    width: "25%",
  },
  flatListItemHeaderName: {
    width: "45%",
    color: Colors.WHITE,
    fontSize: FontSize.BODY_18,
  }
})