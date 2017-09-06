import axios from 'axios';
import { SET_CURRENT_USER } from './types';
import setAuthorizationToken from '../assets/js/setAuthorizationToken';

const API_VERSION = window.API_VERSION;

export function setCurrentUser(user) { // eslint-disable-line require-jsdoc, max-len
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() { // eslint-disable-line require-jsdoc, max-len
  return (dispatch) => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function login(data) { // eslint-disable-line require-jsdoc, max-len
  return dispatch => axios.post(`/api/${API_VERSION}/users/signin`, data);
}
