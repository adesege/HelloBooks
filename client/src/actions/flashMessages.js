import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';

export function addFlashMessage(message) { // eslint-disable-line require-jsdoc, import/prefer-default-export, max-len
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}

export default function deleteFlashMessage(id) { // eslint-disable-line require-jsdoc, max-len
  return {
    type: DELETE_FLASH_MESSAGE,
    id
  };
}

