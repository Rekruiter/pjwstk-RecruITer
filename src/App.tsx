import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/applications" element={<NotFound />} />
        <Route path="/job-offers" element={<JobOfferList />} />
        <Route path="/job-offers/new" element={<JobOfferForm />} />
        <Route path="/job-offers/:id" element={<JobOfferPreview />} />
        <Route path="/recruitments" element={<NotFound />} /> */}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
