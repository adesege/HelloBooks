import types from './types';

const { SET_IMAGE_DATA, DELETE_IMAGE_DATA } = types;

export function setImageData(imageData) { // eslint-disable-line require-jsdoc, max-len
  return {
    type: SET_IMAGE_DATA,
    imageData
  };
}

export function deleteImageData() { // eslint-disable-line require-jsdoc, max-len
  return {
    type: DELETE_IMAGE_DATA,
  };
}
