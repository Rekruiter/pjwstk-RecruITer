import axios, { BASE_URL } from '../axios/axios';

export interface ReigsterInput {
  email: string;
  password: string;
  name: string;
}

export interface Logininput {
  email: string;
  password: string;
}

export const registerPost = async (inputData: ReigsterInput): Promise<any[]> => {
  const { data } = await axios.post(`${BASE_URL}/register`, {
    data: inputData,
  });
  return data;
};

export const loginPost = async (inputData: Logininput): Promise<any[]> => {
  const { data } = await axios.post(`${BASE_URL}/authenticate`, {
    data: inputData,
  });
  return data;
};
