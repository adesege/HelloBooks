import axios from 'axios';

/**
 * Set authorization token in axios header
 *
 * @param {string} token
 *
 * @returns {undefined}
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['authenticate-token'] = token;
  } else {
    delete axios.defaults.headers.common['authenticate-token'];
  }
};

export default setAuthorizationToken;
