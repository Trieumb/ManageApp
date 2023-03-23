import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchInventory,
  writeImportSupplies,
  writeExportSupplies,
} from '../../config/api/SupplyAPI';

export const fetchInventoryThunk = createAsyncThunk(
  'supplies/fetchInventory',
  async (_, thunkAPI) => {
    try {
      const res = await fetchInventory();
      return res;
    } catch (error) {
      console.log('Failed to fetch inventory:', error.message);
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);
export const writeImportSuppliesThunk = createAsyncThunk(
  'supplies/writeImportSupplies',
  async (data, thunkAPI) => {
    try {
      console.log('suppliesData:', data);
      const res = await writeImportSupplies(data.supplies, data.inventory);
      return res;
    } catch (error) {
      console.log('Failed writeImportSupplies:', error.message);
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);
export const writeExportSuppliesThunk = createAsyncThunk(
  'supplies/writeExportSupplies',
  async (data, thunkAPI) => {
    try {
      const res = await writeExportSupplies(data.supplies, data.inventory);
      return res;
    } catch (error) {
      console.log('Failed writeExportSupplies:', error.message);
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);

