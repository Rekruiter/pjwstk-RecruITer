import { useQuery } from 'react-query';
import { getCandidateApplicationsList } from '../../api/applications/userApplications';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { GetPathsLinks } from '../../constants/paths';
import CandidateApplicationListElement from '../../components/CandidateApplicationsContent/CandidateApplicationListElement';
import { useState } from 'react';

const CandidateApplicationsPage = () => {
  const navigate = useNavigate();
  const {
    data: applicationsData,
    isLoading,
    isError,
  } = useQuery('candidateApplications', getCandidateApplicationsList);

  const [pickedStatus, setPickedStatus] = useState<'all' | 'accepted' | 'rejected' | 'pending'>('all');

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div className="m-auto">An error occured</div>;
  }

  const handleOpenApplication = (id: number) => {
    navigate(GetPathsLinks.getCandidateApplicationPreview(id));
  };

  const filteredApplications = applicationsData?.filter((application) => {
    if (pickedStatus === 'all') {
      return true;
    }
    if (pickedStatus === 'accepted') {
      return application.isAccepted === true;
    }
    if (pickedStatus === 'rejected') {
      return application.isAccepted === false;
    }
    if (pickedStatus === 'pending') {
      return application.isAccepted === null;
    }
    return false;
  });

  return (
    <div className="flex flex-col justify-center p-8 md:px-12 lg:px-16">
      <div className="flex justify-around p-4">
        <button className={`${pickedStatus === 'all' ? 'underline' : ''}`} onClick={() => setPickedStatus('all')}>
          All
        </button>
        <button
          className={`${pickedStatus === 'accepted' ? 'underline' : ''}`}
          onClick={() => setPickedStatus('accepted')}>
          Accepted
        </button>
        <button
          className={`${pickedStatus === 'rejected' ? 'underline' : ''}`}
          onClick={() => setPickedStatus('rejected')}>
          Rejected
        </button>
        <button
          className={`${pickedStatus === 'pending' ? 'underline' : ''}`}
          onClick={() => setPickedStatus('pending')}>
          Pending
        </button>
      </div>
      <div className="container rounded-b-xl">
        {filteredApplications?.map((application) => (
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
