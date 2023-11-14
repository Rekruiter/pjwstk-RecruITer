import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/RouteNotFound';
import JobOfferForm from './components/fragments/job-offers/JobOfferForm';
import { useContext, useEffect } from 'react';
import AuthContext from './context/auth-context';
import CandidatePanel from './pages/panels/CandidatePanel';
import RecruiterPanel from './pages/panels/RecruiterPanel';
import AdminPanel from './pages/panels/AdminPanel';
import { Paths, getRequiredRoles } from './constants/paths';
import { IAuthorizationObject } from './types/authorizationTypes';
import PermissionDenied from './pages/PermissionDenied';
import { wrapInLayout, wrapInPanelLayout } from './helpers';
import JobOfferPage from './pages/JobOfferPage';
import instance from './api/axios/axios';
import JobOfferPreviewPage from './pages/JobOfferPreviewPage';

function App() {
  const { role, isLoggedIn, token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

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
      case 'candidate':
      case 'user':
        return wrapInPanelLayout(<CandidatePanel />);
      case 'recruiter':
      case 'techRecruiter':
        return wrapInPanelLayout(<RecruiterPanel />);
      case 'admin':
        return wrapInPanelLayout(<AdminPanel />);
      default:
        return wrapInLayout(<HomePage />, true);
    }
  };

  const routesConfig: RouteObject[] = [
    { path: Paths.home.path, element: getDefaultHomeRoute() },
    { path: Paths.notFound.path, element: wrapInLayout(<NotFound />) },
    { path: Paths.jobOffers.path, element: wrapInLayout(<JobOfferPage />) },
    { path: Paths.newJobOffer.path, element: PrivateRoute(<JobOfferForm />, getRequiredRoles('newJobOffer')) },
    { path: Paths.jobOfferPreview.path, element: wrapInLayout(<JobOfferPreviewPage />) },
  ];

  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
}

export default App;
