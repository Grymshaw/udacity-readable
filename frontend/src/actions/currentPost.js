import * as types from '../constants/ActionTypes';

export const setCurrentPost = postId => ({
  type: types.SET_CURRENT_POST,
  postId,
});
