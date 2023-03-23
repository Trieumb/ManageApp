import {firebase} from '@react-native-firebase/database';
import {Alert} from 'react-native';
import uuid from 'react-native-uuid';
const database = firebase
  .app()
  .database(
    'https://managerapp-41d45-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );

export const fetchInventory = async () => {
  try {
    const snapshot = await database.ref('supplies/inventory').once('value');
    const inventory = [];
    snapshot.forEach(snapshot => {
      inventory.push({
        id: snapshot.key,
        model: snapshot.val().model,
        name: snapshot.val().name,
        quantity: snapshot.val().quantity,
        unit: snapshot.val().unit,
      });
    });
    return inventory;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const writeImportSupplies = async (importSupplies, inventory) => {
  try {
    var inventories = [...inventory];
    var writeData = {};
    const supplies = importSupplies.supplies.reduce((acc, cur) => {
      var itemUid = uuid.v4().toString();
      const index = inventories.findIndex(item => item.id === cur.model);
      console.log('index:', index);
      if (index >= 0) {
        inventories[index].quantity += parseInt(cur.importQuantity);
      } else {
        inventories.push({
          id: cur.model,
          model: cur.model,
          name: cur.name,
          quantity: parseInt(cur.importQuantity),
          unit: cur.unit,
        });
      }
      acc[itemUid] = {...cur, importQuantity: parseInt(cur.importQuantity)};
      return acc;
    }, {});
    writeData = {
      dateStockin: importSupplies.dateStockin,
      supplier: importSupplies.supplier,
      supplies,
    };
    const newKey = await database.ref('supplies/goodsReceived').push(writeData);
    const res = await writeInventories(inventories);
    return res;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const writeExportSupplies = async (exportSupplies, inventory) => {
  try {
    var writeData = {};
    var inventories = [...inventory];
    const suppliesExport = exportSupplies.suppliesExport.reduce((acc, cur) => {
      const index = inventories.findIndex(item => item.id === cur.model);
      console.log('index:', index, cur.exportQuantity);
      if (index >= 0) {
        if (inventories[index].quantity >= parseInt(cur.exportQuantity)) {
          inventories[index].quantity -= parseInt(cur.exportQuantity);
        } else {
          Alert.alert('Số lượng trong kho không đủ!');
        }
      } else {
        Alert.alert('Vật tư không có trong kho!');
      }
      acc.push({...cur, exportQuantity: parseInt(cur.exportQuantity)});
      return acc;
    }, []);
    writeData = {
      dateStockOut: exportSupplies.dateStockOut,
      cause: exportSupplies.cause,
      suppliesExport,
    };
    console.log('writeData:', writeData);
    const newKey = await database.ref('supplies/goodsDelivery').push(writeData);
    const res = await writeInventories(inventories);
    return res;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const writeInventories = async inventories => {
  try {
    const writeData = inventories.reduce((acc, cur) => {
      acc[cur.id] = {
        model: cur.model,
        name: cur.name,
        quantity: cur.quantity,
        unit: cur.unit,
      };
      return acc;
    }, {});
    console.log('write inventoriesData: ', writeData);
    const res = await database.ref('supplies/inventory').set(writeData);
    return inventories;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
