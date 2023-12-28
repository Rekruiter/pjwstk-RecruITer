import { IRegisterFormInput } from '@/types/authFormTypes';
import axios from '../axios/axios';

export const registerCompanyPost = async (inputData: IRegisterFormInput) => {
  await axios.post('/createCompanyAccount', inputData);
};
