import { getCompanyJobOfferList } from '@/api/jobOffers/jobOffers';
import CompanyJobOffersList from '@/components/CompanyJobOffers/CompanyJobOffersList';
import Spinner from '@/components/UI/Spinner/Spinner';
import { defaultStyles } from '@/constants/defaultStyles';
import { Paths } from '@/constants/paths';
import { cn } from '@/lib/utils';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const CompanyJobOfferListPage = () => {
  const { data, isLoading, isError } = useQuery('companyJobOffers', getCompanyJobOfferList);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div className="m-auto">An error occured</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="container flex flex-col gap-5 rounded-b-xl p-8 md:px-12 lg:px-16">
        <h3 className="text-2xl font-semibold text-dark">Your job offers</h3>
        <Link to={Paths.addJobOffer.path} className={cn(defaultStyles.orangeButton, 'w-fit')}>
          Add new job offer
        </Link>
        {data && data.length !== 0 ? (
          <CompanyJobOffersList jobOffers={data} />
        ) : (
          <p className="mx-auto w-fit py-10 text-dark">No results found</p>
        )}
      </div>
    </div>
  );
};

export default CompanyJobOfferListPage;
