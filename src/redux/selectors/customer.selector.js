import {createSelector} from 'reselect';

export const customersSelector = state => state.customersData;

export const customersList = createSelector(customersSelector, customers => {
  return customers.customersData;
});
