import {createSelector} from 'reselect';

export const JobsSelector = (state) => state.jobsData;

export const jobListSelector = createSelector(
  JobsSelector,
  (jobsData) => jobsData,
);
