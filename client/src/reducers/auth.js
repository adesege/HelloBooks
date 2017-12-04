import isEmpty from 'lodash/isEmpty';
import types from '../actions/types';
import { initialAuthState } from '../reducers/initialState';

const { SET_CURRENT_USER } = types;

export default (state = initialAuthState, action = {}) => {
  switch (action.type) {
  case SET_CURRENT_USER:
    return {
      isAuthenticated: !isEmpty(action.user),
      user: action.user
    };
  default: return state;
  }
};
