import axios from '../axios/axios';
import { publicPracticalTasksSchema, PracticalTaskItemSchema } from '../../types/publicTasksTypes';

export const getPublicPracticalTasks = async (pageNumber: number, technologiesFilter: string[]) => {
  const { data } = await axios.get(`/practicalTasks?pageNumber=${pageNumber}`, {
    params: {
      technologies: technologiesFilter,
    },
  });
  return publicPracticalTasksSchema.parse(data);
};

export const getPublicPracticalTask = async (id: string) => {
  const { data } = await axios.get(`/practicalTasks/${id}`);
  return PracticalTaskItemSchema.parse(data);
};

export const solvePublicPracticalTaskPost = async ({ id, solution }: { id: number; solution: string }) => {
  const { data } = await axios.post(`/practicalTasks/${id}/solutions`, {
    Solution: solution,
  });
  return data;
};
