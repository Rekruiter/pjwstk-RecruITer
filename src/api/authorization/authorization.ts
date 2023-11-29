import {
  ILoginFormInput,
  IRegisterFormInput,
  IResetPasswordConfirmFormInput,
  IResetPasswordFormInput,
} from '../../types/authFormTypes';
import { AuthorizationObjectSchema } from '../../types/authorizationTypes';
import axios from '../axios/axios';

export const registerPost = async (inputData: IRegisterFormInput) => {
  await axios.post('/register', inputData);
};

export const loginPost = async (inputData: ILoginFormInput) => {
  const { data } = await axios.post('/authenticate', inputData);

  const parsedData = AuthorizationObjectSchema.safeParse(data);
  if (parsedData.success) {
    return parsedData.data;
  }
  throw new Error('Error parsing data, please contact administrator');
};

export const resetPasswordPost = async (inputData: IResetPasswordFormInput) => {
  await axios.post('/resetPassword', inputData);
};

export const resetPasswordConfirmPost = async (inputData: IResetPasswordConfirmFormInput, token: string) => {
  await axios.post('/verifyReset/' + token, inputData);
};

export const verifyAccountGet = async (token: string) => {
  await axios.get('/verifyAccount/' + token);
};
