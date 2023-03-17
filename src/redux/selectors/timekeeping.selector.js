import {createSelector} from 'reselect';

export const timekeepingSelector = state => state.timekeeping;

export const timekeepingListSelector = createSelector(
  timekeepingSelector,
  timekeeping => {
    return timekeeping.monthTimeKeepingList;
  },
);
