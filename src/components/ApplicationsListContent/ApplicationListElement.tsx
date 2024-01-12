import { GetPathsLinks } from '@/constants/paths';
import { IApplication } from '@/types/applicationTypes';
import { Link } from 'react-router-dom';

interface ApplicationListElementProps {
  applicationData: IApplication;
  type: 'candidate' | 'recruiter';
}

const ApplicationListElement = ({ applicationData, type }: ApplicationListElementProps) => {
  return (
    <Link
      to={
        type === 'candidate'
          ? GetPathsLinks.getCandidateApplicationPreview(applicationData.applicationId)
          : GetPathsLinks.getRecruiterApplicationPreview(applicationData.applicationId)
      }
      className={
        'group flex max-w-full cursor-pointer flex-wrap justify-between break-all border bg-light px-5 py-2 text-dark hover:bg-orange sm:flex-nowrap sm:justify-normal'
      }>
      <div className="min-w-[5.5rem] basis-1/2 gap-2 group-hover:text-light">
        {Object.entries(applicationData).map(
          ([key, value]) =>
            key &&
            key !== 'applicationId' && (
              <p key={key} className="w-fit group-hover:scale-110 group-hover:underline">
                {value}
              </p>
            ),
        )}
      </div>
    </Link>
  );
};

export default ApplicationListElement;
