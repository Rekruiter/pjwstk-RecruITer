import { PathSearchParams } from '@/constants/paths';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

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

  return <div>CompanyPracticalTasksContent</div>;
};

export default CompanyPracticalTasksContent;
