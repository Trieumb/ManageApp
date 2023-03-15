import {createSelector} from 'reselect';

export const timekeepingSelector = state => state.timekeeping;

export const timekeepingListSelector = createSelector(
  timekeepingSelector,
  timekeeping => {
    console.log('timekeepingSelector', timekeeping);
    return timekeeping.monthTimeKeepingList;
  },
);
export const markedDateListSelector = createSelector(
  timekeepingSelector,
  timekeeping => {
    console.log('timekeepingSelector', timekeeping);
    return timekeeping.markedDateList;
  },
);
