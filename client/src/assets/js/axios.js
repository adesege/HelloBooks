import axios from 'axios';

window.axios = axios;

window.axios.interceptors.response.use(
  response => Promise.resolve(response),
  error => Promise.reject(error)
);
