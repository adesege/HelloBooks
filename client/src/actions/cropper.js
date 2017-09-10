import { SET_IMAGE_DATA, DELETE_IMAGE_DATA } from './types';

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

export default {

};
