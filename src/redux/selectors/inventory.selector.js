import {createSelector} from 'reselect';

export const inventorySelector = state => state.inventory;

export const inventoryListSelector = createSelector(inventorySelector, inventory => {
  return inventory.inventory;
});
