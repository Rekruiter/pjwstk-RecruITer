import { IApplyJobOffer } from '@/types/jobOfferTypes';
import axios from '../axios/axios';

export const applyJobOfferPost = async ({ id, inputData }: { id: string; inputData: IApplyJobOffer }) => {
  await axios.post(`/jobOffers/${id}/apply`, inputData);
};
