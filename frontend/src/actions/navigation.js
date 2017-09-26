import * as types from '../constants/ActionTypes';

export const addNewPost = () => ({ type: types.ADD_NEW_POST });

export const changeCategory = category => ({ type: types.CHANGE_CATEGORY, category });
