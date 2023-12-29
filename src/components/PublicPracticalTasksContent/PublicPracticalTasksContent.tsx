import { getSupportedTechnologies } from '@/api/general/supportedTechnologies';
import { getPublicPracticalTasks } from '@/api/tasks/publicTasks';
import { safeJSONParse } from '@/helpers';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import PublicPracticalTasksList from './PublicPracticalTasksList/PublicPracticalTasksList';
import PaginationFooter from '../UI/PaginationFooter/PaginationFooter';
import Spinner from '../UI/Spinner/Spinner';
import { PathSearchParams } from '@/constants/paths';

const PublicPracticalTasksContent = () => {
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

  const pickedTechnologies: string = safeJSONParse(searchParams.get('technologies'));
  const technologies: string[] = pickedTechnologies ? pickedTechnologies.toLowerCase().split(',') : [];

  const queryPage = parseInt(currentPage ?? '1');

  const {
    isLoading: technologiesLoading,
    data: supportedTechnologies,
    isError: isTechnologiesError,
  } = useQuery('supportedTechnologies', getSupportedTechnologies);

  const { isLoading, isError, data, isFetching } = useQuery(
    ['practicalTasks', queryPage, technologies],
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
      prevParams.set(PathSearchParams.pageNumber, pageNumber.toString());
      return prevParams;
    });
  };

  return (
    data &&
    supportedTechnologies && (
      <div className="container flex flex-grow flex-col gap-10 bg-light px-6">
        <PublicPracticalTasksList
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

export default PublicPracticalTasksContent;
