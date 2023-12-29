import axios from '../axios/axios';
import {
  publicPracticalTasksSchema,
  PracticalTaskItemSchema,
  publicTheoreticalTasksSchema,
  TheoreticalTaskItemSchema,
} from '../../types/publicTasksTypes';

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
  return TheoreticalTaskItemSchema.parse(data);
};
