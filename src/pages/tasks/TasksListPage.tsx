import { useSearchParams } from 'react-router-dom';
import { safeJSONParse } from '../../helpers';
import { useQuery } from 'react-query';
import { getPublicPracticalTasks } from '@/api/tasks/publicTasks';
import Spinner from '@/components/UI/Spinner/Spinner';
import PublicTasksContent from '@/components/PublicTasksContent/PublicTasksContent';
import PaginationFooter from '@/components/UI/PaginationFooter/PaginationFooter';
import { useEffect } from 'react';
import { getSupportedTechnologies } from '@/api/general/supportedTechnologies';

const TasksListPage = () => {
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

  const pickedTechnologies: string = safeJSONParse(searchParams.get('technologies'));
  const technologies: string[] = pickedTechnologies ? pickedTechnologies.toLowerCase().split(',') : [];

  const queryPage = parseInt(currentPage ?? '1');

  const {
    isLoading: technologiesLoading,
    data: supportedTechnologies,
    isError: isTechnologiesError,
  } = useQuery('supportedTechnologies', getSupportedTechnologies);

  const { isLoading, isError, data, isFetching } = useQuery(
    ['tasks', queryPage, technologies],
    () => getPublicPracticalTasks(queryPage, technologies),
    {
      keepPreviousData: true,
    },
  );

  if (isLoading || technologiesLoading) {
    return <Spinner />;
  }

  if (isError || isTechnologiesError) {
    return <p className="m-auto">An error occured, please try again later</p>;
  }

  const handleChangePage = (pageNumber: number) => {
    if (pageNumber === queryPage) return;
    setSearchParams((prevParams) => {
      prevParams.set('page', pageNumber.toString());
      return prevParams;
    });
  };

  return (
    data &&
    supportedTechnologies && (
      <div className="container flex flex-grow flex-col gap-10 bg-light px-6">
        <PublicTasksContent
          tasks={data.items}
          isFetching={isFetching}
          technologies={technologies}
          setSearchParams={setSearchParams}
          supportedTechnologies={supportedTechnologies}
        />
        <PaginationFooter totalPageNumber={data.totalPages} currPage={queryPage} callback={handleChangePage} />
      </div>
    )
  );
};

export default TasksListPage;
