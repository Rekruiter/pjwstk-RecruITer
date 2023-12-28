import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const PublicTheoreticalTasksContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page');

  useEffect(() => {
    if (!currentPage) {
      setSearchParams((prevParams) => {
        prevParams.set('page', '1');
        return prevParams;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>PublicTheoreticalTasksContent</div>;
};

export default PublicTheoreticalTasksContent;
