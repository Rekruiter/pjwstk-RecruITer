import { getPrivateTheoreticalTasks } from '@/api/tasks/companyTasks';
import { PathSearchParams } from '@/constants/paths';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';
import PaginationFooter from '../UI/PaginationFooter/PaginationFooter';
import CompanyTheoreticalTasksList from './CompanyTheoreticalTasksList/CompanyTheoreticalTasksList';

const CompanyTheoreticalTasksContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get(PathSearchParams.pageNumber);

  useEffect(() => {
    if (!currentPage) {
      setSearchParams((prevParams) => {
        prevParams.set(PathSearchParams.pageNumber, '1');
        return prevParams;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryPage = parseInt(currentPage ?? '1');

  const { data, isLoading, isError, isFetching } = useQuery(
    ['companyTheoreticalTasks', queryPage],
    () => getPrivateTheoreticalTasks(queryPage),
    {
      cacheTime: 0,
    },
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p className="m-auto">An error occured, please try again later</p>;
  }

  const handleChangePage = (pageNumber: number) => {
    if (pageNumber === queryPage) return;
    setSearchParams((prevParams) => {
      prevParams.set(PathSearchParams.pageNumber, pageNumber.toString());
      return prevParams;
    });
  };

  return (
    data && (
      <div className="container flex flex-grow flex-col gap-10 bg-light px-0 md:px-6">
        <CompanyTheoreticalTasksList tasks={data.items} isFetching={isFetching} />
        <PaginationFooter totalPageNumber={data.totalPages} currPage={queryPage} callback={handleChangePage} />
      </div>
    )
  );
};

export default CompanyTheoreticalTasksContent;
