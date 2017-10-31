import types from './types';

const { SET_IMAGE_DATA, DELETE_IMAGE_DATA } = types;

export const setImageData = (imageData) => ({
  type: SET_IMAGE_DATA,
  imageData
});

export const deleteImageData = () => ({
  type: DELETE_IMAGE_DATA,
});
