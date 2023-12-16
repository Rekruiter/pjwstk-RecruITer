import { useQuery } from 'react-query';
import Spinner from '../../components/UI/Spinner/Spinner';
import { verifyAccountGet } from '../../api/authorization/authorization';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/UI/Button';

const VerifyAccountPage = () => {
  const { token } = useParams() as { token: string };
  const navigate = useNavigate();

  const { isSuccess, error } = useQuery<any, Error>(['verifyAccount', token], () => verifyAccountGet(token));

  if (isSuccess) {
    return (
      <div className="m-auto flex flex-col items-center gap-1 text-dark">
        <h3 className="text-lg font-semibold text-success_color">Your account has been successfully verified</h3>
        <p>Welcome to our society, you can now log into your account</p>
        <Button
          onClick={() =>
            navigate('/?authorization=login', {
              replace: true,
            })
          }
          className="mt-2">
          Navigate to login section
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-auto flex flex-col items-center gap-1 text-dark">
        <h3 className="text-lg font-semibold text-error_color">Oh no !</h3>
        <p>{error.message}</p>
      </div>
    );
  }
  return <Spinner />;
};

export default VerifyAccountPage;
