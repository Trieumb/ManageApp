import {createSelector} from 'reselect';

export const inventorySelector = state => state.supplies;

export const inventoryListSelector = createSelector(inventorySelector, inventory => {
  return inventory.inventory;
});
