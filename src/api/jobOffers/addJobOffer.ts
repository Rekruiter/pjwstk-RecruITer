import { IJobOfferInput } from '@/types/jobOfferTypes';
import axios from '../axios/axios';

export const addJobOfferPost = async (inputData: IJobOfferInput) => {
  const { questions, ...input } = inputData;

  const newQuestions: string[] = questions.map((question) => question.contents);

  await axios.post('/jobOffers', { ...input, questions: newQuestions });
};

export const updateJobOfferPut = async (inputData: IJobOfferInput & { id: string }) => {
  const { id, ...input } = inputData;
  await axios.put(`/jobOffers/${id}`, input);
};
