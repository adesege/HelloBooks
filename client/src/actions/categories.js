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
 * @param {object} category - new added category
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
 * @param {array} categories - categories
 *
 * @returns {object} action creator
*/
export const categoryFetched = categories => ({
  type: CATEGORY_FETCHED,
  categories
});

/**
 * Action creator for setting editted book in the store
 *
 * @param {object} category - edited category
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
 * @param {number} id - deleted category id
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
 * @param {object} options - options for adding book category
 *
 * @returns {promise} axios http promise
*/
export const addBookCategory = options =>
  dispatch =>
    axios
      .post(`books/categories`, options)
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
      .get('books/categories')
      .then(
        (response) => {
          dispatch(categoryFetched(response.data.categories));
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
 * @param {object} options - options for editing book category
 *
 * @returns {promise} Axios http promise
 */
export const editBookCategory = options =>
  dispatch =>
    axios
      .put(`books/categories/${options.id}`, options)
      .then(
        (response) => {
          dispatch(categoryEdited(response.data.category));
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
 * @param {object} options - options for deleting a book category
 *
 * @returns {promise} Axios http promise
 */
export const deleteBookCategory = options =>
  dispatch =>
    axios
      .delete(`books/categories/${options.id}`, options)
      .then(
        (response) => {
          dispatch(categoryDeleted(options.id));
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
