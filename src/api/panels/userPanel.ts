import { UserPanelPageSchema } from '@/types/panelPageTypes';
import axios from '../axios/axios';

export const getUserPanelData = async () => {
  const { data } = await axios.get('/basicUserPanel');
  return UserPanelPageSchema.parse(data);
};
