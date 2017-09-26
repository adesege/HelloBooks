import axios from 'axios';

const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['authenticate-token'] = token;
  } else {
    delete axios.defaults.headers.common['authenticate-token'];
  }
};

export default setAuthorizationToken;
