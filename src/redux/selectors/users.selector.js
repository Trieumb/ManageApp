import {createSelector} from 'reselect';

export const usersSelector = state => state.users;

export const userListSelector = createSelector(usersSelector, users => {
  return users.users;
});
