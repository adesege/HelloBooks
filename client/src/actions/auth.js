import axios from 'axios';
import setAuthorizationToken from 'utils/setAuthorizationToken';
import { addFlashMessage } from './flashMessages';
import types from './types';

const { SET_CURRENT_USER } = types;

/**
 * Action creator for setting the current user
 *
 * @returns {object} action creator
 *
 * @param {object} user
*/
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

/**
 * Action that logs a user out
 *
 * @returns {undefined}
*/
export const logout = () =>
  (dispatch) => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };

/**
 * Action for logging a user in
 *
 * @param {object} userData
 *
 * @returns {undefined}
*/
export const logUserIn = userData =>
  (dispatch) => {
    const {
      token,
      group,
      userId
    } = userData;
    const userPayload = {
      group,
      userId
    };
    localStorage.setItem('authToken', token);
    localStorage.setItem('userPayload', JSON.stringify(userPayload));
    setAuthorizationToken(token);
    dispatch(setCurrentUser(userPayload));
  };

/**
 * Make network request to server to log a user in
 *
 * @param {object} data
 *
 * @returns {object} Axios success response object
 * @returns {object} Axios error response object
 */
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

/**
 * Sends reset password mail
 *
 * @param {object} data
 *
 * @returns {promise} Axios promise
*/
export const sendResetPasswordMail = data =>
  dispatch => axios
    .post('users/reset-password', data)
    .then((response) => {
      dispatch(addFlashMessage({
        text: response.data.message,
        type: 'success'
      }));
    })
    .catch((errors) => {
      dispatch(addFlashMessage({
        type: 'error',
        text: errors.response.data.message
      }));
    });

/**
 * Resets user's password
 *
 * @param {object} data
 *
 * @returns {promise} Axios promise
*/
export const resetPassword = data =>
  dispatch =>
    axios
      .post('users/reset-password/verify', data)
      .then((response) => {
        dispatch(addFlashMessage({
          text: response.data.message,
          type: 'success'
        }));
      })
      .catch((errors) => {
        if (errors.response) {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
          }));
        }
      });
