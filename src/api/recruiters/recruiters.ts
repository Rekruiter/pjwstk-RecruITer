import {
  TechnicalRecruiterListSchema,
  RecruiterListSchema,
  RecruiterSchema,
  IRecruiterInputForm,
} from '@/types/recruiterTypes';
import axios from '../axios/axios';

export const getTechnicalRecruiters = async () => {
  const { data } = await axios.get('/recruiters?type=technical');
  return TechnicalRecruiterListSchema.parse(data);
};

export const getRecruiters = async () => {
  const { data } = await axios.get('/recruiters');
  return RecruiterListSchema.parse(data);
};

export const getRecruiter = async (id: string) => {
  const { data } = await axios.get(`/recruiters/${id}`);
  return RecruiterSchema.parse(data);
};

export const createRecruiter = async (inputData: IRecruiterInputForm) => {
  await axios.post(`/recruiters`, inputData);
};

type IRecruiterInputFormWithoutHiredate = {
  [K in keyof IRecruiterInputForm]: K extends 'hiredate' ? string | undefined : IRecruiterInputForm[K];
};
//TEMPORARY SOLUTION

export const updateRecruiter = async (inputData: IRecruiterInputFormWithoutHiredate & { id: string }) => {
  const { id, ...input } = inputData;
  delete input.hiredate;

  await axios.put(`/recruiters/${id}`, input);
};
