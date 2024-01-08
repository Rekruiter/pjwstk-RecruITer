import {
  IPracticalTaskFormInput,
  ITheoreticalTaskFormInput,
  publicPracticalTasksSchema,
  publicTheoreticalTasksSchema,
} from '@/types/tasksTypes';
import axios from '../axios/axios';

export const getPrivatePracticalTasks = async (pageNumber: number) => {
  const { data } = await axios.get('/practicalTasks', {
    params: {
      pageNumber: pageNumber,
      private: true,
    },
  });
  return publicPracticalTasksSchema.parse(data);
};

export const getPrivateTheoreticalTasks = async (pageNumber: number) => {
  const { data } = await axios.get(`/theoreticalTasks?pageNumber=${pageNumber}&private=true`);
  return publicTheoreticalTasksSchema.parse(data);
};

export const addPracticalTaskPost = async (inputData: IPracticalTaskFormInput) => {
  await axios.post('/practicalTasks', inputData);
};

export const addTheoreticalTaskPost = async (inputData: ITheoreticalTaskFormInput) => {
  await axios.post('/theoreticalTasks', inputData);
};
