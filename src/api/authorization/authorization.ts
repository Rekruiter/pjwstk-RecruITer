import { ILoginFormInput, IRegisterFormInput } from '../../types/authFormTypes';
import axios from '../axios/axios';

export const registerPost = async (inputData: IRegisterFormInput): Promise<any[]> => {
  const { data } = await axios.post('/register', {
    data: inputData,
  });
  return data;
};

export const loginPost = async (inputData: ILoginFormInput): Promise<any[]> => {
  const { data } = await axios.post('/authenticate', {
    data: inputData,
  });
  return data;
};
