import { IAuthorizationObject } from '../types/authorizationTypes';

export type PathType = {
  path: string;
  requiredRoles?: IAuthorizationObject['role'][];
  headerSignature?: string;
};

type HeaderPathType = {
  path: PathType['path'];
  headerSignature: string;
};

// When creating new path make sure to assign element in BrowserRouter in App.tsx

const allPaths = [
  'home',
  'notFound',
  'jobOffers',
  'companyJobOffers',
  'newJobOffer',
  'jobOfferPreview',
  'candidateApplications',
  'candidateApplicationPreview',
  'recruiterApplications',
  'recruiterApplicationPreview',
  'resetPasswordConfirm',
  'verifyAccount',
  'fillUpPersonalData',
  'tasks',
  'profileSettings',
  'companySettings',
  'company',
  'practicalTaskSolve',
  'theoreticalTaskSolve',
  'addPracticalTask',
  'editPracticalTask',
  'addTheoreticalTask',
  'editTheoreticalTask',
  'addJobOffer',
  'editJobOffer',
  'manageCompanyTasks',
  'jobOfferApplications',
  'recruiterRecruitments',
  'prepareRecruitment',
] as const;

export type AllPathsType = (typeof allPaths)[number];

export const GetPathsLinks = {
  getJobOfferPreview: (id: number) => `/job-offers/${id}`,
  getJobOffersWithFilters: (idCompany?: number) => `/job-offers${idCompany ? `?idCompany=${idCompany}` : ''}`,
  getCandidateApplicationPreview: (id: number) => `/candidate-applications/${id}`,
  getRecruiterApplicationPreview: (id: number) => `/recruiter-applications/${id}`,
  getPracticalTaskSolve: (id: number) => `/practice-task-solve/${id}`,
  getTheoreticalTaskSolve: (id: number) => `/theoretical-task-solve/${id}`,
  getPracticalTasksList: () => `/tasks?${PathSearchParams.taskType}=practical`,
  getTheoreticalTasksList: () => `/tasks?${PathSearchParams.taskType}=practical`,
  getJobOfferEdit: (id: number) => `/edit-job-offer/${id}`,
  getJobOfferApplications: (id: number) => `/job-offer-applications/${id}`,
  getCompanyPracticalTasksList: () => `/manage-company-tasks?${PathSearchParams.taskType}=practical`,
  getCompanyTheoreticalTasksList: () => `/manage-company-tasks?${PathSearchParams.taskType}=theoretical`,
  getPracticalTaskEdit: (id: number) => `/edit-practical-task/${id}`,
  getTheoreticalTaskEdit: (id: number) => `/edit-theoretical-task/${id}`,
  getPrepareRecruitment: (id: number) => `/prepare-recruitment/${id}`,
};

export const PathSearchParams = {
  taskType: 'taskType',
  pageNumber: 'page',
};

export const Paths: Record<AllPathsType, PathType> = {
  home: {
    path: '/',
    headerSignature: 'Home',
  },
  company: {
    path: '/company',
    headerSignature: 'Company',
    requiredRoles: [],
  },
  notFound: {
    path: '*',
  },
  jobOffers: {
    path: '/job-offers',
    headerSignature: 'Job offers',
  },
  companyJobOffers: {
    path: '/company-job-offers',
    requiredRoles: ['admin', 'recruiter', 'techRecruiter'],
  },
  newJobOffer: {
    path: '/job-offers/new',
    requiredRoles: ['admin', 'recruiter', 'techRecruiter', 'user'],
  },
  jobOfferPreview: {
    path: '/job-offers/:id',
  },
  candidateApplications: {
    path: '/candidate-applications',
    requiredRoles: ['candidate'],
    headerSignature: 'My applications',
  },
  candidateApplicationPreview: {
    path: '/candidate-applications/:id',
    requiredRoles: ['candidate'],
  },
  recruiterApplications: {
    path: '/recruiter-applications',
    headerSignature: 'Applications',
    requiredRoles: ['recruiter', 'techRecruiter', 'admin'],
  },
  recruiterApplicationPreview: {
    path: '/recruiter-applications/:id',
    requiredRoles: ['recruiter', 'techRecruiter', 'admin'],
  },
  resetPasswordConfirm: {
    path: '/reset/:token',
  },
  verifyAccount: {
    path: '/verify/:token',
  },
  fillUpPersonalData: {
    path: '/personal-data',
    requiredRoles: ['candidate', 'user'],
  },
  tasks: {
    path: '/tasks',
    headerSignature: 'Tasks',
  },
  practicalTaskSolve: {
    path: '/practice-task-solve/:id',
  },
  theoreticalTaskSolve: {
    path: '/theoretical-task-solve/:id',
  },
  profileSettings: {
    path: '/profile-settings',
  },
  companySettings: {
    path: '/company-settings',
    requiredRoles: ['admin', 'techRecruiter', 'recruiter'],
  },
  addJobOffer: {
    path: '/new-job-offer',
    requiredRoles: ['admin', 'recruiter', 'techRecruiter'],
  },
  editJobOffer: {
    path: '/edit-job-offer/:id',
    requiredRoles: ['admin', 'recruiter', 'techRecruiter'],
  },
  manageCompanyTasks: {
    path: '/manage-company-tasks',
    requiredRoles: ['admin', 'techRecruiter', 'recruiter'],
  },
  addPracticalTask: {
    path: '/add-practical-task',
    requiredRoles: ['admin', 'techRecruiter', 'recruiter'],
  },
  addTheoreticalTask: {
    path: '/add-theoretical-task',
    requiredRoles: ['admin', 'techRecruiter', 'recruiter'],
  },
  editTheoreticalTask: {
    path: '/edit-theoretical-task/:id',
    requiredRoles: ['admin', 'techRecruiter', 'recruiter'],
  },
  editPracticalTask: {
    path: '/edit-practical-task/:id',
    requiredRoles: ['admin', 'techRecruiter', 'recruiter'],
  },
  jobOfferApplications: {
    path: '/job-offer-applications/:id',
    requiredRoles: ['admin', 'techRecruiter', 'recruiter'],
  },
  recruiterRecruitments: {
    path: '/recruiter-recruitments',
    requiredRoles: ['admin', 'techRecruiter', 'recruiter'],
    headerSignature: 'Recruitments',
  },
  prepareRecruitment: {
    path: '/prepare-recruitment/:id',
    requiredRoles: ['admin', 'techRecruiter', 'recruiter'],
  },
};

export const getRequiredRoles = (path: (typeof allPaths)[number]): IAuthorizationObject['role'][] => {
  return Paths[path].requiredRoles ?? [];
};

const getRoleToPath = (role: IAuthorizationObject['role']) => {
  return Object.values(Paths).filter((value) => !value.requiredRoles || value.requiredRoles.includes(role));
};

const getHeaderPath = (allPathsByRole: PathType[]) => {
  return allPathsByRole
    .map((value) => {
      return {
        path: value.path,
        headerSignature: value.headerSignature,
      };
    })
    .filter((value): value is HeaderPathType => value.headerSignature !== undefined);
};

const roleToPath: Record<IAuthorizationObject['role'], PathType[]> = {
  admin: getRoleToPath('admin'),
  candidate: getRoleToPath('candidate'),
  recruiter: getRoleToPath('recruiter'),
  techRecruiter: getRoleToPath('techRecruiter'),
  user: getRoleToPath('user'),
};

export const headerPathsByRole: Record<IAuthorizationObject['role'], HeaderPathType[]> = {
  admin: getHeaderPath(roleToPath.admin),
  candidate: getHeaderPath(roleToPath.candidate),
  recruiter: getHeaderPath(roleToPath.recruiter),
  techRecruiter: getHeaderPath(roleToPath.techRecruiter),
  user: getHeaderPath(roleToPath.user),
};

export const headerDefaultRoles: HeaderPathType[] = Object.values(Paths).filter(
  (value): value is HeaderPathType =>
    value.headerSignature !== undefined && (value.requiredRoles === undefined || value.requiredRoles.length === 0),
);
