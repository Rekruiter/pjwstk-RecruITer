import { RecruitmentCandidateSchema } from '@/types/recruitmentsTypes';
import axios from '../axios/axios';

export const getRecruitmentPreviewCandidate = async (id: string) => {
  const { data } = await axios.get(`/recruitments/${id}`);
  return RecruitmentCandidateSchema.parse(data);
};
