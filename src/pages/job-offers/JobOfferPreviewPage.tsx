import { useQuery } from 'react-query';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getJobOffer } from '../../api/jobOffers/jobOffers';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button';
import { GetPathsLinks, Paths } from '../../constants/paths';
import { FaStar } from 'react-icons/fa';
import { useContext, useState } from 'react';
import AuthContext from '@/context/auth-context';
const JobOfferPreviewPage = () => {
  const { id } = useParams() as { id: string };
  const { data, isError, isLoading } = useQuery(['jobOffer', id], () => getJobOffer(id));

  const [, setSearchParams] = useSearchParams();
  const [showApplyForm, setShowApplyForm] = useState(false);
  const { role } = useContext(AuthContext);

  if (isError) {
    return <div className="m-auto">An error ocurred</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <div className="m-auto">Job offer not found</div>;
  }

  const daysLeft = Math.round((new Date(data.dateExpires).getTime() - Date.now()) / (24 * 60 * 60 * 1000));
  const dateAdded = new Date(data.dateAdded);

  const handleOpenLoginModal = (authMethod: 'login' | 'register') => {
    setSearchParams((prevParams) => {
      prevParams.set('authorization', authMethod);
      return prevParams;
    });
  };

  const DisabledButton = () => (
    <Button disabled className="disabled:opacity-70">
      Apply
    </Button>
  );

  return (
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <h2 className="w-fit rounded-xl text-center text-title_bold text-dark">{data.title}</h2>
      <Link className="cursor-pointer hover:text-orange" to={GetPathsLinks.getJobOffersWithFilters(data.idCompany)}>
        {data.companyName}
      </Link>
      <p>
        Salary: {data.minSalary}
        {data.maxSalary !== null && `-${data.maxSalary}`} {data.currency}
      </p>
      <p>Description: {data.description}</p>
      <p>Requirements:</p>
      <div className="flex flex-wrap gap-2">
        {Object.keys(data.requirements).map((key) => (
          <div className="flex items-center gap-2 border border-dark p-1">
            <p>{key}</p>
            <div className="inline-flex text-orange">
              {Array(data.requirements[key])
                .fill(0)
                .map(() => (
                  <FaStar />
                ))}
            </div>
          </div>
        ))}
      </div>
      <p>This job ofer expires in {daysLeft} days</p>
      <p className="pb-10">
        Available since: {dateAdded.getDate()}-{dateAdded.getMonth()}-{dateAdded.getFullYear()}
      </p>
      {role === 'user' && (
        <div className="flex items-center gap-3">
          <DisabledButton />
          In order to apply for this job offer{' '}
          <Link to={Paths.fillUpPersonalData.path} className="text-orange underline">
            fill your personal data
          </Link>
        </div>
      )}
      {role === undefined && (
        <div className="flex items-center gap-3">
          <DisabledButton />
          <p className="text-lg text-dark">
            To access this feature you need to be logged in, please{' '}
            <span
              className="cursor-pointer font-semibold text-orange underline"
              onClick={() => handleOpenLoginModal('login')}>
              log in
            </span>{' '}
            or{' '}
            <span
              className="cursor-pointer font-semibold text-orange underline"
              onClick={() => handleOpenLoginModal('register')}>
              create an account
            </span>
            .
          </p>
        </div>
      )}
      {showApplyForm && <form></form>}
      {role === 'candidate' && (
        <Button className="w-fit" onClick={showApplyForm ? () => {} : () => setShowApplyForm(true)}>
          {' '}
          Apply
        </Button>
      )}
    </div>
  );
};

export default JobOfferPreviewPage;
