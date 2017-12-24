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
 * @param {object} users - users object
 *
 * @returns {object} action creator
 */
export const usersFetched = users => ({
  type: GET_USERS,
  users
});

/**
 * Action creator when user has been updated
 *
 * @param {object} users - updated user object
 *
 * @returns {object} action creator
 */
export const userUpdated = users => ({
  type: USER_UPDATED,
  users
});


/**
 * Make network request to get all users or a particular user
 *
 * @param {object} options - options for getting users
 *
 * @returns {promise} Axios http promise
 */
export const getUsers = options =>
  (dispatch) => {
    const endpoint = options ? `/${options.userId}` : '';
    return axios
      .get(`users${endpoint}`)
      .then(
        (response) => {
          dispatch(usersFetched(response.data.users));
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
 * @param {object} options - options for editing a user
 *
 * @returns {promise} Axios http promise
 */
export const updateUser = options =>
  (dispatch) =>
    axios
      .put(`users/${options.userId}`, options)
      .then((response) => response)
      .catch((errors) => errors);
