import axios, { isAxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  },
  (error) => {
    if (isAxiosError(error) && error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }
    throw new Error('An unexpected error occurred, please contact the administrator');
  },
);

export default instance;
