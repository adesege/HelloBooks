import types from '../actions/types';

const {
  GET_USERS
} = types;
export default (state = [], action = {}) => {
  switch (action.type) {
  case GET_USERS:
    return action.result;

  default: return state;
  }
};
