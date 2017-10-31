import axios from 'axios';

const { API_VERSION } = window;

export const userSignupRequestAction = userData =>
  dispatch =>
    axios
      .post(`/api/${API_VERSION}/users/signup`, userData);

export default {};
