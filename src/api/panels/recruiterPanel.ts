import { RecuiterPanelPageSchema } from '../../types/panelPageTypes';
import axios from '../axios/axios';

export const getRecruiterPanelData = async () => {
  const { data } = await axios.get('/recruiterPanel');
  return RecuiterPanelPageSchema.parse(data);
};
