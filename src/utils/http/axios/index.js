import axios from 'axios';
import checkHttpStatus from './checkHttpStatus';
import checkLoginStatus from './checkLoginStatus';
const instance = axios.create();

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem('zst-token');
    return config;
  },
  error => Promise.reject(error.message),
);

instance.interceptors.response.use(
  response => {
    checkLoginStatus(response.data);
    return response.data;
  },
  error => {
    if (error.response) {
      checkHttpStatus(error.response.status);
    }
  },
);

export default instance;
