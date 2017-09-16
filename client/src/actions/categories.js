import axios from 'axios';
import {
  CATEGORY_ADDED,
  CATEGORY_FETCHED,
  CATEGORY_EDITED,
  CATEGORY_DELETED } from './types';
import { addFlashMessage } from './flashMessages';

const API_VERSION = window.API_VERSION;

export function categoryAdded(category) { // eslint-disable-line require-jsdoc
  return {
    type: CATEGORY_ADDED,
    category
  };
}


export function categoryFetched(category) { // eslint-disable-line require-jsdoc
  return {
    type: CATEGORY_FETCHED,
    category
  };
}

export function categoryEdited(category) { // eslint-disable-line require-jsdoc
  return {
    type: CATEGORY_EDITED,
    category
  };
}

export function categoryDeleted(id) { // eslint-disable-line require-jsdoc
  return {
    type: CATEGORY_DELETED,
    id
  };
}

export const addBookCategory = data =>
  dispatch =>
    axios
      .post(`/api/${API_VERSION}/books/categories`, data)
      .then(
        (response) => {
          dispatch(categoryAdded(response.data.category));
          dispatch(addFlashMessage({
            type: 'success',
            text: response.data
          }));
          return response;
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data
          }));
          return errors;
        }
      );


export const getBookCategories = () =>
  dispatch =>
    axios
      .get(`/api/${API_VERSION}/books/categories`)
      .then(
        (response) => {
          dispatch(categoryFetched(response.data.message));
          return response;
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data
          }));
          return errors;
        }
      );

export const editBookCategory = data =>
  dispatch =>
    axios
      .put(`/api/${API_VERSION}/books/categories/${data.id}`, data)
      .then(
        (response) => {
          dispatch(categoryEdited(response.data.data));
          dispatch(addFlashMessage({
            type: 'success',
            text: response.data
          }));
          return response;
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data
          }));
          return errors;
        }
      );

export const deleteBookCategory = data =>
  dispatch =>
    axios
      .delete(`/api/${API_VERSION}/books/categories/${data.id}`, data)
      .then(
        (response) => {
          dispatch(categoryDeleted(data.id));
          dispatch(addFlashMessage({
            type: 'success',
            text: response.data
          }));
          return response;
        },
        (errors) => {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data
          }));
          return errors;
        }
      );

