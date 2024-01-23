import { useQuery } from 'react-query';
import { getApplicationList } from '../../api/applications/applications';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useSearchParams } from 'react-router-dom';
import { PathSearchParams } from '../../constants/paths';
import { useEffect } from 'react';
import ApplicationListElement from '@/components/ApplicationsListContent/ApplicationListElement';
import PaginationFooter from '@/components/UI/PaginationFooter/PaginationFooter';
import { Switch } from '@headlessui/react';
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
    ['applicationList', queryPage, queryInclude, queryHistorical],
    () => getApplicationList(queryPage, queryInclude, queryHistorical),
    {
      staleTime: 1000 * 60 * 5,
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
        {applicationsData.applications.map((application) => (
          <ApplicationListElement key={application.applicationId} applicationData={application} type={type} />
        ))}
        {!applicationsData ||
          (applicationsData.applications.length === 0 && (
            <p className="mx-auto w-fit py-10 text-dark">No results found</p>
          ))}
      </>
    );
  }

  const handleChangePage = (pageNumber: number) => {
    if (pageNumber === queryPage) return;
    setSearchParams((prevParams) => {
      prevParams.set(PathSearchParams.pageNumber, pageNumber.toString());
      return prevParams;
    });
  };

  const isHistorical = historical === 'true';

  return (
    <>
      <div className="container flex flex-grow flex-col justify-between p-8 md:px-12 lg:px-16">
        <div className="flex flex-col rounded-b-xl">
          <div className="flex justify-center gap-10 p-2 pb-5 text-dark">
            <button
              className={`${include === 'new' ? 'underline decoration-orange underline-offset-8' : ''}`}
              onClick={() =>
                setSearchParams((prevParams) => {
                  prevParams.set('include', 'new');
                  prevParams.set(PathSearchParams.pageNumber, '1');
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
                  prevParams.set(PathSearchParams.pageNumber, '1');
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
                  prevParams.set(PathSearchParams.pageNumber, '1');
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
                  prevParams.set(PathSearchParams.pageNumber, '1');
                  return prevParams;
                })
              }>
              All
            </button>
          </div>
          <div className="mb-5 flex flex-col items-end gap-2 text-sm">
            <label className="font-semibold text-dark">Show historical</label>
            <div className="flex items-center gap-2 text-light">
              <Switch
                checked={isHistorical}
                onChange={(value: boolean) => {
                  const newHistorical = value ? 'true' : 'false';
                  setSearchParams((prevParams) => {
                    prevParams.delete('historical');
                    prevParams.append('historical', newHistorical);
                    return prevParams;
                  });
                }}
                className={`${isHistorical ? 'bg-orange' : 'bg-light'}
    relative inline-flex h-[28px] w-[55px] shrink-0 cursor-pointer rounded-full border-2 border-dark/20 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${isHistorical ? 'translate-x-[30px] bg-white' : 'translate-x-0 bg-orange'}
      pointer-events-none inline-block h-[21px] w-[21px] translate-y-[1px] transform rounded-full 
       shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>
          <div className="flex flex-col gap-2">{content}</div>
        </div>
      </div>
      {applicationsData?.totalPages && (
        <PaginationFooter
          totalPageNumber={applicationsData.totalPages}
          currPage={queryPage}
          callback={handleChangePage}
        />
      )}
    </>
  );
};

export default ApplicationListPage;
