import { useQuery } from 'react-query';
import { getCandidateApplicationsList } from '../api/applications/userApplications';
import Spinner from '../components/UI/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { GetPathsLinks } from '../constants/paths';
import CandidateApplicationListElement from '../components/CandidateApplicationsContent/CandidateApplicationListElement';

const CandidateApplicationsPage = () => {
  const navigate = useNavigate();
  const {
    data: applicationsData,
    isLoading,
    isError,
  } = useQuery('candidateApplications', getCandidateApplicationsList);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div className="m-auto">An error occured</div>;
  }

  const handleOpenApplication = (id: number) => {
    navigate(GetPathsLinks.getCandidateApplicationPreview(id));
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="container rounded-b-xl p-8 md:px-12 lg:px-16">
        {applicationsData?.map((application) => (
          <CandidateApplicationListElement
            key={application.applicationId}
            applicationData={application}
            handleOpenApplication={handleOpenApplication}
          />
        ))}
        {!applicationsData && <p className="mx-auto w-fit py-10">No results found</p>}
      </div>
    </div>
  );
};

export default CandidateApplicationsPage;
