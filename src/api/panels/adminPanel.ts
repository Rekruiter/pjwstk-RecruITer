import { AdminPanelPageSchema } from '../../types/panelPageTypes';
import axios from '../axios/axios';

export const getAdminPanelData = async () => {
  const { data } = await axios.get('/panelAdmin');
  return AdminPanelPageSchema.parse(data);
};
