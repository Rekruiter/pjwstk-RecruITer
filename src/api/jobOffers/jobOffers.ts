import axios, { BASE_URL } from '../axios/axios';

export type JobOffer = {
  id: string;
  idCompany: string;
  companyName: string;
  salary: number;
  description: string;
  dateAdded: string;
  dateExpires: string;
  requirements: string;
  title: string;
};

export const fetchJobOffers = async (): Promise<JobOffer[]> => {
  const { data } = await axios.get(`${BASE_URL}/jobOffers`);
  return data;
};

export const fetchJobOffer = async (id: string): Promise<JobOffer> => {
  const { data } = await axios.get(`${BASE_URL}/jobOffers/${id}`);
  return data;
};
