import { IPersonalDataForm, IPersonalDataInput, PersonalDataFetchSchema } from '../../types/personalDataFormTypes';
import axios from '../axios/axios';

export const personalDataGet = async () => {
  const { data } = await axios.get('/candidatePersonalData');
  return PersonalDataFetchSchema.parse(data);
};

export const personalDataPost = async (inputData: IPersonalDataInput) => {
  await axios.post(`/fillUpCandidatePersonalData`, inputData);
};

export const getPersonalDataInputForm = (inputData: IPersonalDataForm): IPersonalDataInput => {
  const pickedTechnologies = inputData.technologies
    .filter((technology) => technology.isPicked)
    .map((technology) => {
      return {
        name: technology.name,
      };
    });
  const pickedForeignLanguages = inputData.foreignLanguages
    .filter((language) => language.isPicked)
    .map((language) => language.code);

  const inputJobHistory: IPersonalDataInput['jobHistory'] = inputData.jobHistories.map((historyObj) => {
    return {
      position: historyObj.position,
      nameOfCompany: historyObj.nameOfCompany,
      startDate: historyObj.startDate,
      endDate: historyObj.endDate,
    };
  });

  return {
    address: inputData.address,
    status: inputData.status,
    portfolioLinks: inputData.portfolioLinks,
    technologies: pickedTechnologies,
    foreignLanguages: pickedForeignLanguages,
    jobHistory: inputJobHistory,
    dateOfBirth: inputData.dateOfBirth,
  };
};
