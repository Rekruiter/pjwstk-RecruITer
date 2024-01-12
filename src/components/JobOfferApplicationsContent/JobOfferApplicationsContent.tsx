import { IJobOffersWithApplicationDetailsSchema } from '@/types/jobOfferTypes';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface JobOfferApplicationsContentProps {
  jobOffer: IJobOffersWithApplicationDetailsSchema['companyJobOfferDto'];
  applications: IJobOffersWithApplicationDetailsSchema['applicationsDetails'];
}

const JobOfferApplicationsContent = ({ applications, jobOffer }: JobOfferApplicationsContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <div className="mb-4 flex items-center gap-2 text-dark">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowBack size={24} />
        </button>
        <h3 className="text-2xl font-semibold">Job offer applications</h3>
      </div>
      <h4 className="text-xl font-semibold text-dark">{jobOffer.title}</h4>
      <p>
        {applications.map((application) => (
          <div>
            {application.candidateName} {application.candidateSurname}
          </div>
        ))}
      </p>
    </div>
  );
};

export default JobOfferApplicationsContent;
