import findIndex from 'lodash/findIndex';
import types from '../actions/types';

const {
  STOCK_MANAGER_FETCHED,
  STOCK_ADDED,
  STOCK_DELETED
} = types;

export default (state = {}, action = {}) => {
  /* eslint-disable no-case-declarations */
  switch (action.type) {
  case STOCK_MANAGER_FETCHED:
    return action.data;

  case STOCK_ADDED:
    return [
      action.data,
      ...state
    ];

  case STOCK_DELETED:
    const index = findIndex(
      state,
      item => parseInt(item.id, 10) === parseInt(action.id, 10)
    );
    if (index >= 0) {
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    }
    return state;

  default: return state;
  }
};
