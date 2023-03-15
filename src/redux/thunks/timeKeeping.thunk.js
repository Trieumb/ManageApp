import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  getUserTimeKeepingByMonth,
  writeNewTimeKeeping,
} from '../../config/api/TimeKeepingAPI';
export const writeNewTimeKeepingThunk = createAsyncThunk(
  'timekeeping/write_timekeeping',
  async (data, thunkAPI) => {
    try {
      const res = await writeNewTimeKeeping(data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);
export const getUserTimeKeepingByMonthThunk = createAsyncThunk(
  'timekeeping/get_user_timekeeping',
  async (data, thunkAPI) => {
    try {
      const res = await getUserTimeKeepingByMonth(data);
      console.log('get_user_timekeeping: ', res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);
