/* eslint "no-undef": 0 */
import 'whatwg-fetch';
import * as types from '../constants/ActionTypes';

export const fetchCategoriesRequest = () => ({
  type: types.FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = categories => ({
  type: types.FETCH_CATEGORIES_SUCCESS,
  categories,
});

export const fetchAllCategories = () => (dispatch) => {
  dispatch(fetchCategoriesRequest());
  return fetch('http://localhost:3001/categories', {
    method: 'get',
    headers: {
      Authorization: 'whatever',
      'Content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(json => json.categories.map(cur => ({ name: cur.name, value: cur.path })))
    .then(categories => dispatch(fetchCategoriesSuccess(categories)));
};
