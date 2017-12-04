import axios from 'axios';

const { API_VERSION } = process.env;

axios.defaults.baseURL = `/api/${API_VERSION}/`;
