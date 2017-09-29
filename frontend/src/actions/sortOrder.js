import * as types from '../constants/ActionTypes';

export const setSortOrder = sortOrder => ({
  type: types.SET_SORT_ORDER,
  sortOrder,
});
