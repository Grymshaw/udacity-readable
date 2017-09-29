// import * as actions from '../actions/sortOrder';
import * as types from '../constants/ActionTypes';

const defaultState = {
  order: 'votesDescending',
};

const sortOrder = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_SORT_ORDER:
      return { order: action.sortOrder };
    default:
      return state;
  }
};

export default sortOrder;
