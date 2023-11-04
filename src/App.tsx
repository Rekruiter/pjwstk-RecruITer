import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout/Layout';
import NotFound from './components/other/NotFound';
import JobOfferForm from './components/fragments/job-offers/JobOfferForm';
import JobOfferPreview from './components/fragments/job-offers/JobOfferPreview';
import JobOfferList from './components/fragments/job-offers/JobOffersList';
import { useContext } from 'react';
import AuthContext from './context/auth-context';
import CandidatePanel from './pages/CandidatePanel';
import RecruiterPanel from './pages/RecruiterPanel';
import AdminPanel from './pages/AdminPanel';
import { Paths } from './constants/paths';
import { IAuthorizationObject } from './types/authorizationTypes';
import PermissionDenied from './pages/PermissionDenied';

const wrapInLayout = (element: JSX.Element, withoutMargin?: boolean) => (
  <Layout withoutMargin={withoutMargin}>{element}</Layout>
);

const wrapInPanelLayout = (element: JSX.Element, withoutMargin?: boolean) => (
  <Layout withoutMargin={withoutMargin} panel>
    {element}
  </Layout>
);

function App() {
  const { role, isLoggedIn } = useContext(AuthContext);

  const PrivateRoute = (element: JSX.Element, requiredRoles?: IAuthorizationObject['role'][]) => {
    if (!isLoggedIn) {
      return <Navigate to={'/?authorization=login'} />;
    }
    if (requiredRoles && !requiredRoles.includes(role!)) {
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
    {
      path: Paths.home.path,
      element: getDefaultHomeRoute(),
    },
    {
      path: Paths.notFound.path,
      element: wrapInLayout(<NotFound />),
    },
    {
      path: Paths.jobOffers.path,
      element: wrapInLayout(<JobOfferList />),
    },
    {
      path: Paths.newJobOffer.path,
      element: PrivateRoute(<JobOfferForm />, Paths.newJobOffer.requiredRoles),
    },
    {
      path: Paths.jobOfferPreview.path,
      element: wrapInLayout(<JobOfferPreview />),
    },
  ];

  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
}

export default App;
