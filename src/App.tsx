import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/RouteNotFound';
import { useContext } from 'react';
import AuthContext from './context/auth-context';

import { AllPathsType, Paths, getRequiredRoles } from './constants/paths';
import PermissionDenied from './pages/PermissionDenied';
import { wrapInLayout, wrapInPanelLayout } from './helpers';
import JobOfferPreviewPage from './pages/JobOfferPreviewPage';
import CandidatePanelPage from './pages/panels/CandidatePanelPage';
import RecruiterPanelPage from './pages/panels/RecruiterPanelPage';
import AdminPanelPage from './pages/panels/AdminPanelPage';
import UserPanelPage from './pages/panels/UserPanelPage';
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage';
import VerifyAccountPage from './pages/VerifyAccountPage';
import { wrapInEmptyLayout } from './helpers/getLayoutWrappers';
import JobOfferListPage from './pages/JobOfferListPage';
import CandidateApplicationsPage from './pages/CandidateApplicationsPage';
import CandidateApplicationPreviewPage from './pages/CandidateApplicationPreviewPage';
import RecruiterApplicationsPage from './pages/RecruiterApplicationsPage';

function App() {
  const { role, isLoggedIn } = useContext(AuthContext);

  const PrivateRoute = (element: JSX.Element, pathName: AllPathsType) => {
    if (!isLoggedIn) {
      return <Navigate to={'/?authorization=login'} />;
    }
    const requiredRoles = getRequiredRoles(pathName);
    if (requiredRoles.length !== 0 && !requiredRoles.includes(role!)) {
      return wrapInPanelLayout(<PermissionDenied />);
    }
    return wrapInPanelLayout(element);
  };

  const getDefaultHomeRoute = () => {
    switch (role) {
      case 'user':
        return wrapInPanelLayout(<UserPanelPage />);
      case 'candidate':
        return wrapInPanelLayout(<CandidatePanelPage />);
      case 'recruiter':
      case 'techRecruiter':
        return wrapInPanelLayout(<RecruiterPanelPage />);
      case 'admin':
        return wrapInPanelLayout(<AdminPanelPage />);
      default:
        return wrapInLayout(<HomePage />, true);
    }
  };

  const routesConfig: RouteObject[] = [
    { path: Paths.home.path, element: getDefaultHomeRoute() },
    { path: Paths.notFound.path, element: wrapInLayout(<NotFound />) },
    { path: Paths.jobOffers.path, element: wrapInLayout(<JobOfferPage />) },
    { path: Paths.newJobOffer.path, element: PrivateRoute(<JobOfferPage />, 'newJobOffer') },
    { path: Paths.jobOfferPreview.path, element: wrapInLayout(<JobOfferPreviewPage />) },
    {
      path: Paths.resetPasswordConfirm.path,
      element: wrapInEmptyLayout(<ResetPasswordConfirmPage />),
    },
    {
      path: Paths.verifyAccount.path,
      element: wrapInEmptyLayout(<VerifyAccountPage />),
    },
    {
      path: Paths.candidateApplications.path,
      element: PrivateRoute(<CandidateApplicationsPage />, 'candidateApplications'),
    },
    {
      path: Paths.candidateApplicationPreview.path,
      element: PrivateRoute(<CandidateApplicationPreviewPage />, 'candidateApplicationPreview'),
    },
    {
      path: Paths.recruiterApplications.path,
      element: PrivateRoute(<RecruiterApplicationsPage />, 'recruiterApplications'),
    },
  ];

  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
}

export default App;
