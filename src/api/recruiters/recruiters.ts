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

export const updateRecruiter = async (inputData: IRecruiterInputForm & { id: string }) => {
  const { id, ...input } = inputData;

  await axios.put(`/recruiters/${id}`, input);
};
