import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { WINDOW_WITH } from '../../config/constants/DimensionsWindown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LineHeight from '../../config/constants/LineHeight';
import Colors from '../../config/constants/Colors';
import FontSize from '../../config/constants/FontSize';
import { fetchInventory } from '../../redux/thunks/inventory.thunk';
import { inventoryListSelector } from '../../redux/selectors/inventory.selector';


const InventoryManager = () => {

  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [displayedInventory, setDisplayedInventory] = useState([]);
  
  const inventory = useSelector((state) => state.supplies.inventory);
  
  useEffect(() => {
    dispatch(fetchInventory());
    setFilterData(inventory);
    setMasterData(inventory);
    console.log(inventory);
  }, [dispatch]);

  // hand searchItem
  const handleSearchSupplies = (text) => {
    if (text) {
      const newData = masterData.filter(
        (item) => {
          const itemData = item.id
            ? item.id.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setFilterData(newData);
      setSearchText(text);
    } else {
      setFilterData(masterData);
      setSearchText(text);
    }
  };
  const FlatListItem = ({ item, index }) => {
    return (
      <View style={{
        backgroundColor: index % 2 == 1 ? Colors.HEADER : Colors.WHITE,
        padding: 10, flexDirection: 'row', justifyContent: 'center'
      }}>
        <Text style={styles.flatListItem}>{item.id}</Text>
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
      <View style={styles.Searchcontainer}>
        <Ionicons name='search' size={20} color={Colors.PRIMARY} />
        <TextInput style={styles.inputSearch}
          value={searchText}
          onChangeText={(text) => handleSearchSupplies(text)}
          placeholder="Tìm kiếm" />
      </View>
      <View style={styles.flarListContainer}>
        <FlatList data={filterData}
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
  Searchcontainer: {
    flexDirection: "row",
    height: 40,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    paddingLeft: 10,
    margin: 15,
  },
  inputSearch: {
    width: WINDOW_WITH - 60,
    fontSize: FontSize.BODY,
    lineHeight: LineHeight.BODY,
  },
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