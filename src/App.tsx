import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout/Layout';
import NotFound from './components/other/NotFound';
import JobOfferForm from './components/fragments/job-offers/JobOfferForm';
import JobOfferPreview from './components/fragments/job-offers/JobOfferPreview';
import JobOfferList from './components/fragments/job-offers/JobOffersList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PrivateRoute = (_element: JSX.Element, _requiredRole?: string) => {
  // const auth = useAuth();

  return <Navigate to={'/?authorization'} />;
};

function App() {
  const wrapInLayout = (element: JSX.Element, withoutMargin?: boolean) => (
    <Layout withoutMargin={withoutMargin}>{element}</Layout>
  );

  const routesConfig: RouteObject[] = [
    {
      path: '/',
      element: wrapInLayout(<HomePage />, true),
    },
    {
      path: '/applications',
      element: PrivateRoute(wrapInLayout(<NotFound />)),
    },
    {
      path: '*',
      element: wrapInLayout(<NotFound />),
    },
    {
      path: '/job-offers',
      element: wrapInLayout(<JobOfferList />),
    },
    {
      path: '/job-offers/new',
      element: wrapInLayout(<JobOfferForm />),
    },
    {
      path: '/job-offers/:id',
      element: wrapInLayout(<JobOfferPreview />),
    },
  ];

  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
}

export default App;
