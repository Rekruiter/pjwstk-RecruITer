import axios, { isAxiosError } from 'axios';
import IError from '../Error/Error';

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
    if (isAxiosError(error)) {
      throw new IError(
        error.response?.data.message || 'An unexpected error occurred, please contact the administrator',
        error.response?.status || 500,
        error.response?.data.errors || [],
      );
    }
    throw new IError('An unexpected error occurred, please contact the administrator', 500, []);
  },
);

export default instance;
