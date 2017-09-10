import axios from 'axios';

const API_VERSION = window.API_VERSION;

export function userSignupRequestAction(userData) { // eslint-disable-line require-jsdoc, import/prefer-default-export, max-len
  return dispatch => axios.post(`/api/${API_VERSION}/users/signup`, userData);
}
