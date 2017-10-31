import types from '../actions/types';

const { GET_BOOKS_HISTORIES } = types;
export default (state = [], action = {}) => {
  switch (action.type) {
  case GET_BOOKS_HISTORIES:
    return action.histories;

  default: return state;
  }
};
