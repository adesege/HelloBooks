import shortid from 'shortid';
import findIndex from 'lodash/findIndex';
import types from '../actions/types';

const { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } = types;

export default (state = [], action = {}) => {
  const index = findIndex(state, { id: action.id });

  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ];
    case DELETE_FLASH_MESSAGE:
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
