import * as types from '../constants/ActionTypes';

const initialState = {
  categories: [],
  isRequestPending: false,
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES_REQUEST:
      return { ...state, isRequestPending: true };
    case types.FETCH_CATEGORIES_SUCCESS:
      return { categories: action.categories, isRequestPending: false };
    default:
      return state;
  }
};

export default categories;
