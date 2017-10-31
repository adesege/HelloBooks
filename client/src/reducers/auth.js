import isEmpty from 'lodash/isEmpty';
import types from '../actions/types';

const { SET_CURRENT_USER } = types;
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_CURRENT_USER:
    return {
      isAuthenticated: !isEmpty(action.user),
      user: action.user
    };
  default: return state;
  }
};
