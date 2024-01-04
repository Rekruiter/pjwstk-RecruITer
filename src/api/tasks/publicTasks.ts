import axios from '../axios/axios';
import {
  publicPracticalTasksSchema,
  publicPracticalTaskItemSchema,
  publicTheoreticalTasksSchema,
  publicTheoreticalTaskItemSchema,
} from '../../types/tasksTypes';

export const getPublicPracticalTasks = async (pageNumber: number, technologiesFilter: string[]) => {
  const { data } = await axios.get('/practicalTasks', {
    params: {
      technologies: technologiesFilter,
      pageNumber: pageNumber,
    },
  });
  return publicPracticalTasksSchema.parse(data);
};

export const getPublicPracticalTask = async (id: string) => {
  const { data } = await axios.get(`/practicalTasks/${id}`);
  return publicPracticalTaskItemSchema.parse(data);
};

export const solvePublicPracticalTaskPost = async ({ id, solution }: { id: number; solution: string }) => {
  const { data } = await axios.post(`/practicalTasks/${id}/solutions`, {
    Solution: solution,
  });
  return data;
};

export const solvePublicTheoreticalTaskPost = async ({ id, solution }: { id: number; solution: string }) => {
  const { data } = await axios.post(`/theoreticalTasks/${id}/solutions`, {
    Solution: solution,
  });
  return data;
};

export const getPublicTheoreticalTasks = async (pageNumber: number) => {
  const { data } = await axios.get(`/theoreticalTasks?pageNumber=${pageNumber}`);
  return publicTheoreticalTasksSchema.parse(data);
};

export const getPublicTheoreticalTask = async (id: string) => {
  const { data } = await axios.get(`/theoreticalTasks/${id}`);
  return publicTheoreticalTaskItemSchema.parse(data);
};
