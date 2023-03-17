import {createSelector} from 'reselect';

export const customersSelector = state => state.customers;

export const customersList = createSelector(customersSelector, customers => {
  return customers.customersData;
});
