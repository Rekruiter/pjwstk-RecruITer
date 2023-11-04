import { IAuthorizationObject } from '../types/authorizationTypes';

export type PathType = {
  path: string;
  requiredRoles?: IAuthorizationObject['role'][];
} & (
  | { getPath?: (...args: any[]) => string; headerSignature?: never }
  | { getPath?: never; headerSignature?: string }
);

type HeaderPathType = {
  path: PathType['path'];
  headerSignature: string;
};

// [] - empty requiredRoles array means that this path is available for all roles
// undefined requiredRoles mean that this path is availble for all users

// When creating new path make sure to assign element in BrowserRouter in App.tsx

export const Paths: Record<string, PathType> = {
  home: {
    path: '/',
    headerSignature: 'Home',
  },
  notFound: {
    path: '*',
  },
  jobOffers: {
    path: '/job-offers',
    headerSignature: 'Job offers',
  },
  newJobOffer: {
    path: '/job-offers/new',
    requiredRoles: ['admin', 'recruiter', 'techRecruiter'],
  },
  jobOfferPreview: {
    path: '/job-offers/:id',
    getPath: (id: string) => `/job-offers/${id}`,
  },
};

const getRoleToPath = (role: IAuthorizationObject['role']) => {
  return Object.values(Paths).filter(
    (value) => !value.requiredRoles || value.requiredRoles.includes(role),
  );
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
    value.headerSignature !== undefined && value.requiredRoles === undefined,
);
