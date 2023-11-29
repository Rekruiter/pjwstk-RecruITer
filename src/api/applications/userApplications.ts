import {
  CandidateApplicationListSchema,
  CandidateApplicationSchema,
  RecruiterApplicationSchema,
  RecuirterApplicationListSchema,
} from '../../types/applicationTypes';
import axios from '../axios/axios';

export const getCandidateApplicationsList = async () => {
  const { data } = await axios.get('/applications');
  return CandidateApplicationListSchema.parse(data);
};

export const getCandidateApplication = async (id: string) => {
  const { data } = await axios.get(`/applications/${id}`);
  return CandidateApplicationSchema.parse(data);
};

export const getRecruiterApplicationsList = async () => {
  const { data } = await axios.get('/applications');
  return RecuirterApplicationListSchema.parse(data);
};

export const getRecruiterApplication = async (id: string) => {
  const { data } = await axios.get(`/applications/${id}`);
  return RecruiterApplicationSchema.parse(data);
};
