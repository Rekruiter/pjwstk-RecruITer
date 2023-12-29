import axios from '../axios/axios';

export const getCompanyPracticalTasks = async (pageNumber: number) => {
  const { data } = await axios.get(`/companyTasks?pageNumber=${pageNumber}`);
  return data;
};
