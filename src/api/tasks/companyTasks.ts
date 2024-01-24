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

export const editPracticalTaskPut = async ({ id, inputData }: { inputData: IPracticalTaskFormInput; id: string }) => {
  await axios.put(`/practicalTasks/${id}`, inputData);
};

export const editTheoreticalTaskPut = async ({
  id,
  inputData,
}: {
  inputData: ITheoreticalTaskFormInput;
  id: string;
}) => {
  await axios.put(`/theoreticalTasks/${id}`, inputData);
};

export const deletePracticalTask = async (id: number) => {
  await axios.delete(`/practicalTasks/${id}`);
};

export const deleteTheoreticalTask = async (id: number) => {
  await axios.delete(`/theoreticalTasks/${id}`);
};
