import axios from 'axios';
import types from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const API_VERSION = window.API_VERSION;
const { SET_CURRENT_USER } = types;

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const logout = () =>
  (dispatch) => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
;

export const login = data =>
  dispatch =>
    axios
      .post(`/api/${API_VERSION}/users/signin`, data)
;

export const logUserIn = response =>
  (dispatch) => {
    const token = response.data.token;
    const userPayload = {
      group: response.data.group,
      userId: response.data.userId
    };

    localStorage.setItem('authToken', token);
    localStorage.setItem('userPayload', JSON.stringify(userPayload));

    setAuthorizationToken(token);
    dispatch(setCurrentUser(userPayload));
  };
