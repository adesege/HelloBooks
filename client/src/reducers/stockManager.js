import findIndex from 'lodash/findIndex';
import types from 'actions/types';

const {
  STOCK_FETCHED,
  STOCK_ADDED,
  STOCK_DELETED
} = types;

/**
 * Handles stock manager reducer
 *
 * @param {object} state - redux state
 * @param {object} action - action creator
 *
 * @returns {array} new state
 */
const stockManager = (state = [], action = {}) => {
  /* eslint-disable no-case-declarations */
  switch (action.type) {
  case STOCK_FETCHED:
    return action.stocks;

  case STOCK_ADDED:
    return [
      action.stocks,
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

export default stockManager;
