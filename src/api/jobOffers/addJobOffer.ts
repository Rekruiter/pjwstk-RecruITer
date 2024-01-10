import { IJobOfferInput } from '@/types/jobOfferTypes';
import axios from '../axios/axios';

export const addJobOfferPost = async (inputData: IJobOfferInput) => {
  const { questions, dateExpires, ...input } = inputData;

  const newQuestions: string[] = questions.map((question) => question.contents);
  const newDateExpires = new Date(dateExpires).toISOString();

  await axios.post('/jobOffers', { ...input, questions: newQuestions, dateExpires: newDateExpires });
};

export const updateJobOfferPut = async (inputData: IJobOfferInput & { id: string }) => {
  const { id, dateExpires, questions, ...input } = inputData;

  const newQuestions: string[] = questions.map((question) => question.contents);
  const newDateExpires = new Date(dateExpires).toISOString();

  await axios.put(`/jobOffers/${id}`, {
    ...input,
    questions: newQuestions,
    dateExpires: newDateExpires,
  });
};

export const extendJobOfferPut = async ({ dateExpires, id }: { id: number; dateExpires: string }) => {
  const newDateExpires = new Date(dateExpires).toISOString();

  await axios.put(`/jobOffers/${id}`, { dateExpires: newDateExpires });
};
