import axios from 'axios';
import setAuthorizationToken from 'utils/setAuthorizationToken';
import { addFlashMessage } from './flashMessages';
import types from './types';

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
  };

export const logUserIn = userData =>
  (dispatch) => {
    const { token, group, userId } = userData;
    const userPayload = {
      group,
      userId
    };

    localStorage.setItem('authToken', token);
    localStorage.setItem('userPayload', JSON.stringify(userPayload));

    setAuthorizationToken(token);
    dispatch(setCurrentUser(userPayload));
  };

export const login = data =>
  dispatch =>
    axios
      .post(`users/signin`, data)
      .then((response) => {
        dispatch(logUserIn(response.data.payload));
        return response;
      })
      .catch(errors => {
        dispatch(addFlashMessage({
          type: 'error',
          text: errors.response.data.message
        }));
        return errors;
      });


export const sendResetPasswordMail = data =>
  dispatch =>
    axios
      .post(`users/reset-password`, data);

export const resetPassword = data =>
  dispatch =>
    axios
      .post(`users/reset-password/verify`, data);
