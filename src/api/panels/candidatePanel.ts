import { CandidatePanelPageSchema } from '../../types/panelPageTypes';
import axios from '../axios/axios';

export const getCandidatePanelData = async () => {
  const { data } = await axios.get('/candidatePanel');
  return CandidatePanelPageSchema.parse(data);
};
