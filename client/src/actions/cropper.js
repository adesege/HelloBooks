import types from './types';

const { SET_IMAGE_DATA, DELETE_IMAGE_DATA } = types;

/**
 * Action creator for setting image data
 *
 * @param {string} imageData
 *
 * @returns {object} action creator
 */
export const setImageData = (imageData) => ({
  type: SET_IMAGE_DATA,
  imageData
});

/**
 * Action creator for deleting image data
 *
 * @returns {object} action creator
 */
export const deleteImageData = () => ({
  type: DELETE_IMAGE_DATA,
});
