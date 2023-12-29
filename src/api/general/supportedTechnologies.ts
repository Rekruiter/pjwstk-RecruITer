import { supportedTechnologiesSchema } from '@/types/tasksTypes';
import axios from '../axios/axios';

export const getSupportedTechnologies = async () => {
  const { data } = await axios.get('/supportedTechnologies');
  return supportedTechnologiesSchema.parse(data);
};
