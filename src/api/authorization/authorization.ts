import { ILoginFormInput, IRegisterFormInput } from '../../types/authFormTypes';
import { TemporaryAuthorizationObjectSchema } from '../../types/authorizationTypes';
import axios from '../axios/axios';

export const registerPost = async (inputData: IRegisterFormInput) => {
  const { data } = await axios.post('/register', inputData);
  return data;

  console.log('tesrt');
};

export const loginPost = async (inputData: ILoginFormInput) => {
  const { data } = await axios.post('/authenticate', inputData);

  const parsedData = TemporaryAuthorizationObjectSchema.safeParse(data);
  if (parsedData.success) {
    return parsedData.data;
  }
  throw new Error('Error parsing data, please contact administrator');
};
