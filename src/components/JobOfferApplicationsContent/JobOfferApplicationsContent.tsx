import { GetPathsLinks } from '@/constants/paths';
import { IJobOffersWithApplicationDetailsSchema } from '@/types/jobOfferTypes';
import { IoMdArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { MdOutlinePreview } from 'react-icons/md';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface JobOfferApplicationsContentProps {
  jobOffer: IJobOffersWithApplicationDetailsSchema['companyJobOfferDto'];
  applications: IJobOffersWithApplicationDetailsSchema['applicationsDetails'];
}

const JobOfferApplicationsContent = ({ applications, jobOffer }: JobOfferApplicationsContentProps) => {
  const navigate = useNavigate();

  const [applicationStatus, setApplicationsStatus] = useState<'accepted' | 'rejected' | 'pending'>('pending');

  const filteredApplications = applications.filter((application) => {
    switch (application.isAccepted) {
      case null:
        return applicationStatus === 'pending';
      case true:
        return applicationStatus === 'accepted';
      case false:
        return applicationStatus === 'rejected';
    }
  });

  return (
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <div className="mb-4 flex items-center gap-2 text-dark">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowBack size={24} />
        </button>
        <h3 className="text-2xl font-semibold">Job offer applications</h3>
      </div>
      <Link to={GetPathsLinks.getJobOfferPreview(jobOffer.id)} className="group flex gap-2 hover:text-orange">
        <h4 className="text-xl font-semibold text-dark group-hover:text-orange group-hover:underline">
          {jobOffer.title}
        </h4>
        <FaExternalLinkAlt size={18} />
      </Link>
      <h5 className="mt-5 text-xl font-semibold text-dark">Applications: </h5>
      <div className="flex justify-center gap-10">
        <button
          onClick={() => setApplicationsStatus('pending')}
          className={cn(' min-w-[150px] rounded-md p-2 text-dark', {
            'bg-dark/5 shadow-md': applicationStatus === 'pending',
          })}>
          Waiting for response
        </button>
        <button
          onClick={() => setApplicationsStatus('accepted')}
          className={cn('min-w-[150px] rounded-md p-2 text-dark', {
            'bg-dark/5 shadow-md': applicationStatus === 'accepted',
          })}>
          Accepted
        </button>
        <button
          onClick={() => setApplicationsStatus('rejected')}
          className={cn('min-w-[150px] rounded-md p-2 text-dark', {
            'bg-dark/5 shadow-md': applicationStatus === 'rejected',
          })}>
          Rejected
        </button>
      </div>
      {filteredApplications.map((application) => (
        <div className="flex w-full gap-5 rounded-md bg-dark/5 p-2 text-dark shadow-md">
          {application.isAccepted === true && (
            <AiOutlineCheckCircle className="text-green-500 group-hover:text-light" size={24} />
          )}
          {application.isAccepted === false && (
            <AiOutlineCloseCircle className="text-orange group-hover:text-light" size={24} />
          )}
          <div>
            <div className="basis-full">
              <p className="line-clamp-1 overflow-hidden">
                <span className="font-medium">
                  {application.candidateName} {application.candidateSurname}
                </span>{' '}
              </p>
            </div>
            <p>{application.candidateEmail}</p>
            {application.expectedSalary && (
              <p className="md:text-cener">
                His exptected salary is <span className="font-medium">{application.expectedSalary} PLN/Hour</span>
              </p>
            )}
          </div>
          <div className="flex flex-1 justify-end">
            <Link
              to={GetPathsLinks.getRecruiterApplicationPreview(application.applicationId)}
              className="flex items-center hover:scale-110 hover:text-orange">
              <MdOutlinePreview size={24} />
            </Link>
          </div>
        </div>
      ))}
      {filteredApplications.length === 0 && <p className="mx-auto w-fit py-10 text-dark">No results found</p>}
    </div>
  );
};

export default JobOfferApplicationsContent;
