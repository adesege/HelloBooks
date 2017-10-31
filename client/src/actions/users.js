import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessages';
import '../config/cloudinary';

const { API_VERSION } = window;
const {
  GET_USERS,
  USER_UPDATED
} = types;

export const usersFetched = result => ({
  type: GET_USERS,
  result
});

export const userUpdated = data => ({
  type: USER_UPDATED,
  data
});


/**
 * @export
 * @returns {func} promise
 */

export const getUsers = payload =>
  (dispatch) => {
    let endpoint = '';
    if (payload) {
      endpoint = `/${payload.userId}`;
    }
    return axios
      .get(`/api/${API_VERSION}/users${endpoint}`)
      .then(
        (data) => {
          dispatch(usersFetched(data.data.data));
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data
          }));
          return errors;
        }
      );
  };


export const updateUser = payload =>
  (dispatch) =>
    axios
      .put(`/api/${API_VERSION}/users/${payload.userId}`)
      .then(
        (data) => {
          dispatch(userUpdated(data.data.data));
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data
          }));
          return errors;
        }
      );
