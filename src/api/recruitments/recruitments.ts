import {
  IInviteCandidateForRecruitment,
  RecruiterRecruitmentListSchema,
  RecruiterRecruitmentSchema,
} from '@/types/recruitmentsTypes';
import axios from '../axios/axios';

export const acceptOrRejectRecruitment = async (inputData: { isAccepted: boolean; id: number }) => {
  const { id, ...rest } = inputData;
  await axios.put(`/recruitmentInvitations/${id}/acceptOrReject`, rest);
};

export const getRecruiterRecruitmentList = async () => {
  const { data } = await axios.get('/recruitmentsForRecruiter');
  return RecruiterRecruitmentListSchema.parse(data);
};

export const getRecruiterRecruitment = async (id: string) => {
  const { data } = await axios.get(`/recruitmentsForRecruiter/${id}`);
  return RecruiterRecruitmentSchema.parse(data);
};

export const planTechnicalRecruitment = async (inputData: IInviteCandidateForRecruitment & { id: number }) => {
  const { id, DateTechnical, idRecruiter } = inputData;
  const input = {
    idRecruiter,
    dateTechnical: new Date(DateTechnical).toISOString(),
  };
  await axios.post(`/recruitments/${id}/planTechnicalRecruitment`, input);
};
