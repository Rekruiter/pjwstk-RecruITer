import { getCompanyPracticalTasks } from '@/api/tasks/companyTasks';
import { PathSearchParams } from '@/constants/paths';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';

const CompanyPracticalTasksContent = () => {
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

  const { isLoading, isError } = useQuery(['companyPracicalTasks', queryPage], () =>
    getCompanyPracticalTasks(queryPage),
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p className="m-auto">An error occured, please try again later</p>;
  }

  // const handleChangePage = (pageNumber: number) => {
  //   if (pageNumber === queryPage) return;
  //   setSearchParams((prevParams) => {
  //     prevParams.set(PathSearchParams.pageNumber, pageNumber.toString());
  //     return prevParams;
  //   });
  // };

  return <div>CompanyPracticalTasksContent</div>;
};

export default CompanyPracticalTasksContent;
