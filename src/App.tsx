import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/RouteNotFound';
import { useContext } from 'react';
import AuthContext from './context/auth-context';

import { Paths, getRequiredRoles } from './constants/paths';
import { IAuthorizationObject } from './types/authorizationTypes';
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

function App() {
  const { role, isLoggedIn } = useContext(AuthContext);

  const PrivateRoute = (element: JSX.Element, requiredRoles: Partial<IAuthorizationObject>['role'][]) => {
    if (!isLoggedIn) {
      return <Navigate to={'/?authorization=login'} />;
    }
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
    { path: Paths.jobOffers.path, element: wrapInLayout(<JobOfferListPage />) },
    { path: Paths.newJobOffer.path, element: PrivateRoute(<JobOfferListPage />, getRequiredRoles('newJobOffer')) },
    { path: Paths.jobOfferPreview.path, element: wrapInLayout(<JobOfferPreviewPage />) },
    {
      path: Paths.resetPasswordConfirm.path,
      element: wrapInEmptyLayout(<ResetPasswordConfirmPage />),
    },
    {
      path: Paths.verifyAccount.path,
      element: wrapInEmptyLayout(<VerifyAccountPage />),
    },
  ];

  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
}

export default App;
