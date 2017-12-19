import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessages';
import '../config/cloudinary';

const {
  GET_USERS,
  USER_UPDATED
} = types;

/**
 * Action creator when users has been fetched
 *
 * @param {object} result
 *
 * @returns {object} action creator
 */
export const usersFetched = result => ({
  type: GET_USERS,
  result
});

/**
 * Action creator when user has been updated
 *
 * @param {object} data
 *
 * @returns {object} action creator
 */
export const userUpdated = data => ({
  type: USER_UPDATED,
  data
});


/**
 * Make network request to get all users or a particular user
 *
 * @param {object} payload
 *
 * @returns {promise} Axios http promise
 */
export const getUsers = payload =>
  (dispatch) => {
    const endpoint = payload ? `/${payload.userId}` : '';
    return axios
      .get(`users${endpoint}`)
      .then(
        (data) => {
          dispatch(usersFetched(data.data.data));
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
          }));
          return errors;
        }
      );
  };

/**
 * Make network request to edit a user
 *
 * @param {object} payload
 *
 * @returns {promise} Axios http promise
 */
export const updateUser = payload =>
  (dispatch) =>
    axios
      .put(`users/${payload.userId}`, payload)
      .then((response) => response)
      .catch((errors) => errors);
