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
 * @param {object} user - user object
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
 * @param {object} userData - user data to set in localstorage
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
 * @param {object} options - payload to log a user in
 *
 * @returns {object} Axios success response object
 * @returns {object} Axios error response object
 */
export const login = options =>
  dispatch =>
    axios
      .post(`users/signin`, options)
      .then((response) => {
        dispatch(logUserIn(response.data.user));
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
 * @param {object} options - options to send reset password mail
 *
 * @returns {promise} Axios promise
*/
export const sendResetPasswordMail = options =>
  dispatch => axios
    .post('users/reset-password', options)
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
 * @param {object} options - options to reset password
 *
 * @returns {promise} Axios promise
*/
export const resetPassword = options =>
  dispatch =>
    axios
      .post('users/reset-password/verify', options)
      .then((response) =>
        dispatch(addFlashMessage({
          text: response.data.message,
          type: 'success'
        })))
      .catch((errors) =>
        dispatch(addFlashMessage({
          type: 'error',
          text: errors.response.data.message
        })));
