import { IJobOfferInput } from '@/types/jobOfferTypes';
import axios from '../axios/axios';

export const addJobOfferPost = async (inputData: IJobOfferInput) => {
  await axios.post('/jobOffers', inputData);
};

export const updateJobOfferPut = async (inputData: IJobOfferInput & { id: string }) => {
  const { id, ...input } = inputData;
  await axios.put(`/jobOffers/${id}`, input);
};
