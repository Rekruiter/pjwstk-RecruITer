import axios from '../axios/axios';

export const acceptOrRejectRecruitment = async (inputData: { isAccepted: boolean; id: number }) => {
  const { id, ...rest } = inputData;
  await axios.put(`/recruitmentInvitations/${id}/acceptOrReject`, rest);
};
