import { IApplyJobOffer } from '@/types/jobOfferTypes';
import axios from '../axios/axios';

export const applyJobOfferPost = async ({
  inputData,
}: {
  inputData: IApplyJobOffer & {
    id: string;
  };
}) => {
  const { id, ...input } = inputData;
  await axios.post(`/applyJobOffer/${id}`, input);
};
