import { TechnicalRecruiterListSchema } from '@/types/recruiterTypes';
import axios from '../axios/axios';

export const getTechnicalRecruiters = async () => {
  const { data } = await axios.get('/technicalRecruiters');
  return TechnicalRecruiterListSchema.parse(data);
};
