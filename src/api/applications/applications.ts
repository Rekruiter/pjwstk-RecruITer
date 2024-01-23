import {
  GetApplicationListSchema,
  CandidateApplicationSchema,
  RecruiterApplicationSchema,
} from '../../types/applicationTypes';
import axios from '../axios/axios';

export const getApplicationList = async (pageNumber: number, include: string, includeHistorical: boolean) => {
  const { data } = await axios.get('/applications', {
    params: {
      page: pageNumber,
      include: include,
      includeHistorical: includeHistorical,
    },
  });
  return GetApplicationListSchema.parse(data);
};

export const getCandidateApplication = async (id: string) => {
  const { data } = await axios.get(`/applications/${id}`);
  return CandidateApplicationSchema.parse(data);
};

export const getRecruiterApplication = async (id: string) => {
  const { data } = await axios.get(`/applications/${id}`);
  return RecruiterApplicationSchema.parse(data);
};

export const acceptOrRejectApplication = async (inputData: { isAccepted: boolean; id: string }) => {
  const { id, ...rest } = inputData;
  await axios.put(`/applications/${id}/acceptOrReject`, rest);
};
