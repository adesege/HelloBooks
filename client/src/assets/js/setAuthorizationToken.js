import axios from 'axios';

export default function setAuthorizationToken(token) { // eslint-disable-line require-jsdoc
  if (token) {
    axios.defaults.headers.common['authenticate-token'] = token;
  } else {
    delete axios.defaults.headers.common['authenticate-token'];
  }
}
