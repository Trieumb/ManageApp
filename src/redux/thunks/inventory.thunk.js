import { createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '@react-native-firebase/database';
import Api_URL from '../../config/api/Api_URL';

export const saveImportData = createAsyncThunk(
  'import/saveImportData',
  async (payload, thunkAPI) => {
    try {
      const { dateStockin, supplier, supplies } = payload;

      const newImportRef = firebase.app().database(Api_URL).ref(`supplies/goodsReceived`).push();

      const newImportData = {
        dateStockin,
        supplier,
        supplies: {},
      };
      const updatedInventory = {};

      supplies.forEach((supply) => {
        const newSupplyRef = newImportRef.child('supplies').push();

        newImportData.supplies[newSupplyRef.key] = {
          importQuantity: parseInt(supply.importQuantity),
          model: supply.model,
          name: supply.name,
          unit: supply.unit,
        };

        if (updatedInventory[supply.model]) {
          updatedInventory[supply.model].quantity += parseInt(supply.importQuantity);
        } else {
          updatedInventory[supply.model] = {
            model: supply.model,
            name: supply.name,
            unit: supply.unit,
            quantity: parseInt(supply.importQuantity),
          };
        }
      });

      await newImportRef.set(newImportData);
      const inventoryRef = firebase.app().database(Api_URL).ref(`supplies/inventory`);
      await inventoryRef.update(updatedInventory);
      console.log('Nhập kho thành công!');
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const updateInventoryAfterImport = createAsyncThunk(
  'inventory/update',
  async (payload, thunkAPI) => {
    try {
      const { supplies } = payload;
      const inventoryRef = firebase.app().database(Api_URL).ref(`supplies/inventory`);
      const inventoryData = await inventoryRef.once('value').then(snapshot => snapshot.val());
      const updatedInventory = { ...inventoryData };

      supplies.forEach((supply) => {
        const { model, name, unit, importQuantity } = supply;
        if (updatedInventory[model]) {
          updatedInventory[model].quantity += parseInt(importQuantity);
        } else {
          updatedInventory[model] = {
            model,
            name,
            unit,
            quantity: parseInt(importQuantity),
          };
        }
      });
      await inventoryRef.set(updatedInventory);
      console.log("cập nhật kho");
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const saveAndRefreshInventoryAfterImport = (payload) => async (dispatch) => {
  try {
    await dispatch(saveImportData(payload));
    await dispatch(updateInventoryAfterImport(payload));
  } catch (error) {
    console.log(error);
  }
};

export const updateInventoryAfterExport = createAsyncThunk('inventory/updateInventoryAfterExport', async (suppliesExport, thunkAPI) => {
  try {
    const inventoryRef = firebase.app().database(Api_URL).ref(`supplies/inventory`);
    const inventoryData = await inventoryRef.once('value').then(snapshot => snapshot.val());
    const updatedInventory = { ...inventoryData };
    console.log(updatedInventory);
    suppliesExport.forEach((item) => {
      const itemId = item.id;
      const exportQuantity = parseInt(item.exportQuantity);
      console.log(item.exportQuantity);
      if (itemId in inventoryData && inventoryData[itemId].quantity >= exportQuantity) {
        const updatedQuantity = inventoryData[itemId].quantity - exportQuantity;
        updatedInventory[itemId] = {
          ...inventoryData[itemId],
          quantity: updatedQuantity,
        };
      } else {
        throw new Error('Invalid quantity');
      }
    });
    console.log(updatedInventory);
    await firebase.app().database(Api_URL).ref('supplies/inventory').update(updatedInventory);
    console.log('Cập nhật kho sau khi xuất thành công!');
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async (_, thunkAPI) => {
  try {
    const snapshot = await firebase.app().database(Api_URL).ref('supplies/inventory').once('value');
    const data = snapshot.val();
    const inventory = Object.keys(data || {}).map((key) => ({ id: key, ...data[key] }));
    return inventory;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const saveAndRefreshInventoryAfterExport = (payload) => async (dispatch) => {
  try {
    const { dateStockOut, cause, suppliesExport } = payload
    await firebase.app().database(Api_URL).ref(`supplies/goodsDelivery`).push(payload);
    console.log("Xuất kho thành công!");
    await dispatch(updateInventoryAfterExport(suppliesExport));
    console.log("đã chạy qua updateInventoryAfterExport");
  } catch (error) {
    console.log(error);
  }
};