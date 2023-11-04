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

function App() {
  const authCtx = useContext(AuthContext);

  const PrivateRoute = (element: JSX.Element, requiredRoles?: IAuthorizationObject['role'][]) => {
    // requiredRoles should not be undefined in privateRoute
    if (!authCtx.isLoggedIn) {
      return <Navigate to={'/?authorization=login'} />;
    }

    // authCtx.role can't be undefined because isLoggedIn is true
    if (requiredRoles && !requiredRoles.includes(authCtx.role!)) {
      return wrapInPanelLayout(<PermissionDenied />);
    }

    return wrapInPanelLayout(element);
  };

  const DefaultHomeRoute = () => {
    if (authCtx.role === 'candidate' || authCtx.role === 'user') {
      return wrapInPanelLayout(<CandidatePanel />);
    } else if (authCtx.role === 'recruiter' || authCtx.role === 'techRecruiter') {
      return wrapInPanelLayout(<RecruiterPanel />);
    } else if (authCtx.role === 'admin') {
      return wrapInPanelLayout(<AdminPanel />);
    }
    return wrapInLayout(<HomePage />, true);
  };

  const wrapInLayout = (element: JSX.Element, withoutMargin?: boolean) => (
    <Layout withoutMargin={withoutMargin}>{element}</Layout>
  );

  const wrapInPanelLayout = (element: JSX.Element, withoutMargin?: boolean) => (
    <Layout withoutMargin={withoutMargin} panel>
      {element}
    </Layout>
  );

  const routesConfig: RouteObject[] = [
    {
      path: Paths.home.path,
      element: DefaultHomeRoute(),
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
