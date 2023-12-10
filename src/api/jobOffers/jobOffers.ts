import { JobOfferSchema, JobOffersListSchema } from '../../types/jobOfferTypes';
import axios from '../axios/axios';

export const getJobOfferList = async () => {
  const { data } = await axios.get('/jobOffers');
  return JobOffersListSchema.parse(data);
};

export const getJobOffer = async (id: string) => {
  const { data } = await axios.get(`/jobOffers/${id}`);
  if (!data) {
    return null;
  }
  return JobOfferSchema.parse(data);
};
