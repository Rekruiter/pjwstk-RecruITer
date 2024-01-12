import { getJobOfferWithDetails } from '@/api/jobOffers/jobOffers';
import JobOfferApplicationsContent from '@/components/JobOfferApplicationsContent/JobOfferApplicationsContent';
import Spinner from '@/components/UI/Spinner/Spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const JobOfferApplicationsPage = () => {
  const { id } = useParams() as { id: string };
  const { data, isError, isLoading } = useQuery(['jobOfferApplications', id], () => getJobOfferWithDetails(id));

  if (isError) {
    return <p className="m-auto">An error occured, please try again later</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <p className="m-auto">Job offer not found</p>;
  }

  return <JobOfferApplicationsContent applications={data.applicationsDetails} jobOffer={data.companyJobOfferDto} />;
};

export default JobOfferApplicationsPage;
