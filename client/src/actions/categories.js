import axios from 'axios';
import types from './types';
import { addFlashMessage } from './flashMessages';

const {
  CATEGORY_ADDED,
  CATEGORY_FETCHED,
  CATEGORY_EDITED,
  CATEGORY_DELETED
} = types;

/**
 * Action creator for adding a category
 *
 * @param {object} category
 *
 * @return {object} action creator
*/
export const categoryAdded = category => ({
  type: CATEGORY_ADDED,
  category
});

/**
 * Action creator for setting fetched book to the store
 *
 * @param {object} category
 *
 * @returns {object} action creator
*/
export const categoryFetched = category => ({
  type: CATEGORY_FETCHED,
  category
});

/**
 * Action creator for setting editted book in the store
 *
 * @param {object} category
 *
 * @returns {object} action creator
*/
export const categoryEdited = category => ({
  type: CATEGORY_EDITED,
  category
});

/**
 * Action creator when category is deleted
 *
 * @param {number} id
 *
 * @returns {object} action creator
*/
export const categoryDeleted = id => ({
  type: CATEGORY_DELETED,
  id
});

/**
 * Make nerwork request to add a book category
 *
 * @param {object} data
 *
 * @returns {promise} axios http promise
*/
export const addBookCategory = data =>
  dispatch =>
    axios
      .post(`books/categories`, data)
      .then(
        (response) => {
          dispatch(categoryAdded(response.data.category));
          dispatch(addFlashMessage({
            type: 'success',
            text: response.data.message
          }));
          return response;
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
          }));
          return errors;
        }
      );

/**
 * Make network request to get book categories
 *
 * @returns {promise} Axios http promise
 */
export const getBookCategories = () =>
  dispatch =>
    axios
      .get(`books/categories`)
      .then(
        (response) => {
          dispatch(categoryFetched(response.data.data));
          return response;
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
          }));
          return errors;
        }
      );

/**
 * Make network request to edit a book category
 *
 * @param {object} data
 *
 * @returns {promise} Axios http promise
 */
export const editBookCategory = data =>
  dispatch =>
    axios
      .put(`books/categories/${data.id}`, data)
      .then(
        (response) => {
          dispatch(categoryEdited(response.data.data));
          dispatch(addFlashMessage({
            type: 'success',
            text: response.data.message
          }));
          return response;
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
          }));
          return errors;
        }
      );

/**
 * Make network request to delete a book category
 *
 * @param {object} data
 *
 * @returns {promise} Axios http promise
 */
export const deleteBookCategory = data =>
  dispatch =>
    axios
      .delete(`books/categories/${data.id}`, data)
      .then(
        (response) => {
          dispatch(categoryDeleted(data.id));
          dispatch(addFlashMessage({
            type: 'success',
            text: response.data.message
          }));
          return response;
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
          }));
          return errors;
        }
      );
