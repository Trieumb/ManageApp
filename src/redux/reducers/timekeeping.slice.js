import {createSlice} from '@reduxjs/toolkit';

import {
  writeNewTimeKeepingThunk,
  getUserTimeKeepingByMonthThunk,
} from '../thunks/timeKeeping.thunk';

const timekeepingSlice = createSlice({
  name: 'timekeeping',
  initialState: {
    monthTimeKeepingList: [],
    isLoading: false,
    isDatawritten: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(writeNewTimeKeepingThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(writeNewTimeKeepingThunk.fulfilled, (state, action) => {
        const index = state.monthTimeKeepingList.findIndex(
          timekeeping => timekeeping.key === action.payload.key,
        );
        if (index >= 0) {
          state.monthTimeKeepingList[index] = action.payload;
        } else {
          state.monthTimeKeepingList.push(action.payload);
        }
        state.isLoading = false;
      })
      .addCase(writeNewTimeKeepingThunk.rejected, state => {
        state.isLoading = false;
      })
      .addCase(getUserTimeKeepingByMonthThunk.pending, state => {
        state.monthTimeKeepingList = [];
        state.isLoading = true;
      })
      .addCase(getUserTimeKeepingByMonthThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.monthTimeKeepingList = action.payload.monthTimeKeepingList;
        }
        state.isLoading = false;
      })
      .addCase(getUserTimeKeepingByMonthThunk.rejected, state => {
        state.monthTimeKeepingList = [];
        state.isLoading = false;
      });
  },
});
export default timekeepingSlice;
