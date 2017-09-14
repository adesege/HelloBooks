import { SET_IMAGE_DATA, DELETE_IMAGE_DATA } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_IMAGE_DATA:
      return action.imageData;

    case DELETE_IMAGE_DATA:
      return [];

    default: return state;
  }
};
