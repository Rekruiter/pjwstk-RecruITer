import { useQuery } from 'react-query';
import { getRecruiterApplicationsList } from '../../api/applications/userApplications';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { GetPathsLinks } from '../../constants/paths';
import RecruiterApplicationListElement from '../../components/RecruiterApplicationsContent/RecruiterApplicationListElement';
import { useState } from 'react';

type ApplicationsRecruiterTabs = 'new' | 'accepted' | 'rejected';

const RecruiterApplicationsPage = () => {
  const navigate = useNavigate();
  const [selectedTab] = useState<ApplicationsRecruiterTabs>('new');
  const {
    data: applicationsData,
    isLoading,
    isError,
    refetch,
  } = useQuery('recruiterApplications', getRecruiterApplicationsList, {
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div className="m-auto">An error occured</div>;
  }

  const handler = async () => {
    refetch({ queryKey: 'recruiterApplications' });
  };

  const handleOpenApplication = (id: number) => {
    navigate(GetPathsLinks.getRecruiterApplicationPreview(id));
  };
  return (
    <div className="flex flex-col justify-center">
      <div className="container rounded-b-xl p-8 md:px-12 lg:px-16">
        <div className="flex justify-center gap-10 p-2 pb-5 text-dark">
          <button
            className={`${selectedTab === 'new' ? 'underline decoration-orange underline-offset-8' : ''}`}
            onClick={() => handler()}>
            New
          </button>
          <button
            className={`${selectedTab === 'accepted' ? 'underline decoration-orange underline-offset-8' : ''}`}
            onClick={() => handler()}>
            Accepted
          </button>
          <button
            className={`${selectedTab === 'rejected' ? 'underline decoration-orange underline-offset-8' : ''}`}
            onClick={() => handler()}>
            Rejected
          </button>
        </div>
        {applicationsData?.map((application) => (
          <RecruiterApplicationListElement
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

export default RecruiterApplicationsPage;
