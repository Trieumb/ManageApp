import {createSelector} from 'reselect';

export const authSelector = state => state.auth;

export const isUserAuthenticatedSelector = createSelector(
  authSelector,
  auth => {
    return auth.isSignedIn;
  },
);
export const userIdSelector = createSelector(authSelector, auth => {
  return auth.userUid;
});

export const errorSelector = createSelector(authSelector, auth => {
  return auth.error;
});
