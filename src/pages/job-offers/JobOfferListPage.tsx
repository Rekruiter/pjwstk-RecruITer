import { useQuery } from 'react-query';
import { getJobOfferList } from '../../api/jobOffers/jobOffers';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GetPathsLinks, PathSearchParams } from '../../constants/paths';
import JobOfferListElement from '../../components/JobOfferContent/JobOfferListElement';
import { useEffect } from 'react';
import PaginationFooter from '@/components/UI/PaginationFooter/PaginationFooter';
import { getSupportedTechnologies } from '@/api/general/supportedTechnologies';
import Searchbox from '@/components/JobOfferContent/Searchbox';
import LocationFilter from '@/components/JobOfferContent/LocationFilter';
import { safeJSONParse } from '@/helpers';
import SeniorityFilter from '@/components/JobOfferContent/SeniorityFilter';

const JobOfferListPage = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search');
  const location = searchParams.get(PathSearchParams.location);
  const seniorities = searchParams.get(PathSearchParams.seniorities);
  const isRemote = searchParams.get(PathSearchParams.isRemote);
  const pageNumber = searchParams.get(PathSearchParams.pageNumber);

  useEffect(() => {
    if (!pageNumber) {
      setSearchParams(
        new URLSearchParams({
          page: '1',
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: supportedTechnologies } = useQuery('supportedTechnologies', getSupportedTechnologies);

  const queryPage = parseInt(pageNumber ?? '1');
  const querySearch = search ?? undefined;

  const locationParam: string | null = safeJSONParse(location);
  const queryLocations: string[] = locationParam ? locationParam.split(',') : [];

  const senioritiesParam: string | null = safeJSONParse(seniorities);
  const querySeniorities: string[] = senioritiesParam ? senioritiesParam.split(',') : [];

  const isRemoteParam: boolean | null = safeJSONParse(isRemote);
  const queryRemote: boolean = Boolean(isRemoteParam);

  const { data, isLoading, isError } = useQuery(
    ['jobOffers', queryPage, querySearch, queryLocations, querySeniorities, queryRemote],
    () => getJobOfferList(queryPage, querySearch, queryLocations, querySeniorities, queryRemote),
    {
      staleTime: 10,
    },
  );

  const handleOpenJobOffer = (id: number) => {
    navigate(GetPathsLinks.getJobOfferPreview(id));
  };

  const handleChangePage = (pageNumber: number) => {
    if (pageNumber === queryPage) return;
    setSearchParams((prevParams) => {
      prevParams.set(PathSearchParams.pageNumber, pageNumber.toString());
      return prevParams;
    });
  };

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  }

  if (isError) {
    content = <div className="m-auto">An error occured</div>;
  }

  if (data) {
    content = (
      <>
        <div className="container flex flex-col gap-1 rounded-b-xl p-8 md:px-12 lg:px-16">
          <h3 className="mb-4 text-2xl font-semibold text-dark">Job offers</h3>
          <h4 className="mb-4 text-base font-semibold text-dark"></h4>
          {data.items.map((jobOffer) => (
            <JobOfferListElement handleOpenJobOffer={handleOpenJobOffer} jobOfferData={jobOffer} key={jobOffer.id} />
          ))}
          {!data && <p className="mx-auto w-fit py-10 text-dark">No results found</p>}
        </div>
        {data && (
          <PaginationFooter totalPageNumber={data.totalPages} currPage={queryPage} callback={handleChangePage} />
        )}
      </>
    );
  }

  return (
    <>
      <div className="sticky top-24 w-full bg-dark_blue text-light shadow-xl">
        <div className="container flex items-start justify-between gap-20 p-6 md:px-20 lg:px-32">
          <Searchbox supportedTechnologies={supportedTechnologies} setSearchParams={setSearchParams} search={search} />
          <LocationFilter pickedLocations={queryLocations} setSearchParams={setSearchParams} isRemote={queryRemote} />
          <SeniorityFilter pickedSeniorities={querySeniorities} setSearchParams={setSearchParams} />
        </div>
      </div>
      {content}
    </>
  );
};

export default JobOfferListPage;
