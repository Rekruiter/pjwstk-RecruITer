import { JobOfferSchema, JobOffersListSchema } from '../../types/jobOffer';
import axios from '../axios/axios';

export const getJobOfferList = async () => {
  const { data } = await axios.get(`/jobOffers`);
  return JobOffersListSchema.parse(data);
};

export const getJobOffer = async (id: string) => {
  const { data } = await axios.get(`/jobOffers/${id}`);
  return JobOfferSchema.parse(data);
};
