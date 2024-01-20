import {
  CompanyJobOfferListSchema,
  JobOfferSchema,
  JobOffersListSchema,
  JobOffersWithApplicationDetailsSchema,
} from '../../types/jobOfferTypes';
import axios from '../axios/axios';

export const getJobOfferList = async (pageNumber: number, search?: string) => {
  const { data } = await axios.get('/jobOffers', {
    params: {
      pageNumber: pageNumber,
      search: search,
    },
  });
  return JobOffersListSchema.parse(data);
};

export const getJobOffer = async (id: string) => {
  const { data } = await axios.get(`/jobOffers/${id}`);
  if (!data) {
    return null;
  }
  return JobOfferSchema.parse(data);
};

export const getJobOfferWithDetails = async (id: string) => {
  const { data } = await axios.get(`/jobOfferWithApplicationDetails/${id}`);
  return JobOffersWithApplicationDetailsSchema.parse(data);
};

export const getCompanyJobOfferList = async () => {
  const { data } = await axios.get('/companyJobOffers');
  return CompanyJobOfferListSchema.parse(data);
};
