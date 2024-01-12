import { useQuery } from 'react-query';
import { getApplicationList } from '../../api/applications/applications';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useSearchParams } from 'react-router-dom';
import { PathSearchParams } from '../../constants/paths';
import { useEffect } from 'react';
import ApplicationListElement from '@/components/ApplicationsListContent/ApplicationListElement';

const INCLUDE_OPTIONS = ['new', 'accepted', 'rejected', 'all'];
interface ApplicationListPageProps {
  type: 'candidate' | 'recruiter';
}

const ApplicationListPage = ({ type }: ApplicationListPageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const include = searchParams.get('include');
  const pageNumber = searchParams.get(PathSearchParams.pageNumber);
  const historical = searchParams.get('historical');

  const setDefaultSearchParams = () => {
    setSearchParams(
      (prevParams) =>
        new URLSearchParams({
          ...prevParams,
          include: 'new',
          page: '1',
          historical: 'false',
        }),
    );
  };

  useEffect(() => {
    if (!include || !INCLUDE_OPTIONS.includes(include)) {
      setDefaultSearchParams();
      return;
    }
    if (!pageNumber) {
      setDefaultSearchParams();
      return;
    }
    if (!historical) {
      setDefaultSearchParams();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryPage = parseInt(pageNumber ?? '1');
  const queryHistorical = historical === 'true';
  const queryInclude = include ?? 'new';

  const {
    data: applicationsData,
    isLoading,
    isError,
  } = useQuery(
    ['recruiterApplications', queryPage, queryInclude, queryHistorical],
    () => getApplicationList(queryPage, queryInclude, queryHistorical),
    {
      staleTime: 10,
    },
  );

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  }
  if (isError) {
    content = <div className="m-auto">An error occured</div>;
  }

  if (applicationsData) {
    content = (
      <>
        {applicationsData?.map((application) => (
          <ApplicationListElement key={application.applicationId} applicationData={application} type={type} />
        ))}
        {!applicationsData ||
          (applicationsData.length === 0 && <p className="mx-auto w-fit py-10 text-dark">No results found</p>)}
      </>
    );
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="container flex flex-col gap-10 rounded-b-xl p-8 md:px-12 lg:px-16">
        <div className="flex justify-center gap-10 p-2 pb-5 text-dark">
          <button
            className={`${include === 'new' ? 'underline decoration-orange underline-offset-8' : ''}`}
            onClick={() =>
              setSearchParams((prevParams) => {
                prevParams.set('include', 'new');
                return prevParams;
              })
            }>
            {type === 'recruiter' ? 'New' : 'Pending'}
          </button>
          <button
            className={`${include === 'accepted' ? 'underline decoration-orange underline-offset-8' : ''}`}
            onClick={() =>
              setSearchParams((prevParams) => {
                prevParams.set('include', 'accepted');
                return prevParams;
              })
            }>
            Accepted
          </button>
          <button
            className={`${include === 'rejected' ? 'underline decoration-orange underline-offset-8' : ''}`}
            onClick={() =>
              setSearchParams((prevParams) => {
                prevParams.set('include', 'rejected');
                return prevParams;
              })
            }>
            Rejected
          </button>
          <button
            className={`${include === 'all' ? 'underline decoration-orange underline-offset-8' : ''}`}
            onClick={() =>
              setSearchParams((prevParams) => {
                prevParams.set('include', 'all');
                return prevParams;
              })
            }>
            All
          </button>
        </div>
        <div className="flex flex-col">{content}</div>
      </div>
    </div>
  );
};

export default ApplicationListPage;
