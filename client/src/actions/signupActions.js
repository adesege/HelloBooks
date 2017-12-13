import axios from 'axios';
import { logUserIn } from './auth';
import { addFlashMessage } from './flashMessages';

/**
 * Make network request to create an account for a user
 *
 * @param {object} userData
 *
 * @returns {promise} Axios http response
 */
export const userSignupRequestAction = userData =>
  dispatch =>
    axios
      .post('users/signup', userData)
      .then((response) => {
        dispatch(addFlashMessage({
          type: 'success',
          text: response.data.message
        }));
        dispatch(logUserIn(response.data.payload));
        return response;
      })
      .catch((errors) => {
        if (errors.response) {
          dispatch(addFlashMessage({
            type: 'error',
            text: errors.response.data.message
          }));
        }
        return errors;
      });

export default {};
