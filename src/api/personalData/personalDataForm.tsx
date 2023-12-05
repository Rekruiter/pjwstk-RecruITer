import { IPersonalDataForm, IPersonalDataInput } from '../../types/personalDataFormTypes';
import axios from '../axios/axios';

export const personalDataPost = async (userId: string, inputData: IPersonalDataInput) => {
  await axios.post(`/personalData/${userId}`, inputData);
};

export const getPersonalDataInputForm = (inputData: IPersonalDataForm): IPersonalDataInput => {
  const inputTechnologies = inputData.technologies.reduce((acc, curr) => acc + curr.code, BigInt(0));
  const inputLanguages = inputData.foreignLanguages.reduce((acc, curr) => acc + curr.code, BigInt(0));

  const inputJobHistory: IPersonalDataInput['jobHistory'] = inputData.jobHistory.map((historyObj) => {
    return {
      position: historyObj.position,
      nameOfCompany: historyObj.nameOfCompany,
      startDate: historyObj.startDate.toISOString(),
      endDate: historyObj.endDate.toISOString(),
    };
  });

  return {
    address: inputData.address,
    status: inputData.status,
    portfolioLinks: inputData.portfolioLinks,
    technologies: inputTechnologies,
    foreignLanguages: inputLanguages,
    jobHistory: inputJobHistory,
    dateOfBirth: inputData.dateOfBirth.toISOString(),
  };
};
