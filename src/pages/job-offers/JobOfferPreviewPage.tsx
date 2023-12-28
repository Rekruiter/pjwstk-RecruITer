import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getJobOffer } from '../../api/jobOffers/jobOffers';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button';
import { GetPathsLinks } from '../../constants/paths';
import { FaStar } from 'react-icons/fa';
const JobOfferPreviewPage = () => {
  const { id } = useParams() as { id: string };
  const { data, isError, isLoading } = useQuery(['jobOffer', id], () => getJobOffer(id));

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
      <p>
        Available since: {dateAdded.getDate()}-{dateAdded.getMonth()}-{dateAdded.getFullYear()}
      </p>
      <Button className="w-fit"> Apply</Button>
    </div>
  );
};

export default JobOfferPreviewPage;
