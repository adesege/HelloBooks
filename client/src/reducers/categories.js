import findIndex from 'lodash/findIndex';
import types from '../actions/types';

const {
  CATEGORY_ADDED,
  CATEGORY_FETCHED,
  CATEGORY_EDITED,
  CATEGORY_DELETED
} = types;

/**
 * Handles categories reducer
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {array} new state
 */
const categories = (state = [], action = {}) => {
  /* eslint-disable no-case-declarations */
  switch (action.type) {
  case CATEGORY_ADDED:
    return [
      action.category,
      ...state
    ];

  case CATEGORY_FETCHED:
    return action.category;

  case CATEGORY_EDITED:
    return state.map((item) => {
      if (
        parseInt(item.id, 10) === parseInt(action.category.id, 10)
      ) {
        item = action.category;
      }
      return item;
    });

  case CATEGORY_DELETED:
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

export default categories;
