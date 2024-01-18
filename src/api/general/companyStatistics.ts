import { CompanyStatisticsListSchema } from '@/types/otherTypes';
import axios from '../axios/axios';

export const getCompanyStatistics = async (startDate: string, endDate: string) => {
  endDate = new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const { data } = await axios.get(`/companyDmlHistory?startDate=${startDate}&endDate=${endDate}`);
  return CompanyStatisticsListSchema.parse(data);
};
