import types from './types';

const { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } = types;

/**
 * Action creator for adding flash message
 *
 * @param {object} message
 *
 * @returns {object} action creator
 */
export const addFlashMessage = message =>
  ({
    type: ADD_FLASH_MESSAGE,
    message
  });

/**
 * Action creator for deleting flash message
 *
 * @returns {object} action creator
 */
export const deleteFlashMessage = () =>
  ({
    type: DELETE_FLASH_MESSAGE
  });

