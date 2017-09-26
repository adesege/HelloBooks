import findIndex from 'lodash/findIndex';
import types from '../actions/types';

const {
  GET_USERS } = types;
export default (state = [], action = {}) => {
  /* eslint-disable no-case-declarations */


  switch (action.type) {
    case GET_USERS:
      return action.result;

    default: return state;
  }
};
