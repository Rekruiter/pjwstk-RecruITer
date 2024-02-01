import IError from '@/api/Error/Error';
import { personalDataGet, personalDataPost } from '@/api/personalData/personalDataForm';
import PersonalDataForm from '@/components/FillPersonalDataForm/PersonalDataForm';
import Spinner from '@/components/UI/Spinner/Spinner';
import { Paths } from '@/constants/paths';
import AuthContext from '@/context/auth-context';
import { IPersonalDataFetch, IPersonalDataInput } from '@/types/personalDataFormTypes';
import { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const FillUpPersonalDataPage = () => {
  const { data, isError, isLoading } = useQuery<IPersonalDataFetch, IError>('personalData', personalDataGet, {
    cacheTime: 1,
  });
  const navigate = useNavigate();

  const { role, logout } = useContext(AuthContext);
  const [, setSearchParams] = useSearchParams();

  const { mutate, isLoading: mutationLoading } = useMutation<any, IError, IPersonalDataInput>(
    'personalDataPost',
    personalDataPost,
    {
      onSuccess: () => {
        if (role === 'user') {
          logout();
          navigate(Paths.home.path);
          setSearchParams((prevParams) => {
            return new URLSearchParams({ ...prevParams, authorization: 'login' });
          });
          toast('Personal data updated successfully, you need to sign in again', {
            type: 'info',
          });
          return;
        }
        toast('Personal data updated successfully', {
          type: 'success',
        });
        navigate(Paths.profileSettings.path);
      },
      onError: (err) => {
        toast(err.message, {
          type: 'error',
        });
      },
    },
  );

  if (isError) {
    return <div className="m-auto">An error occured</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  const handlePersonalDataPost = (inputData: IPersonalDataInput) => {
    mutate(inputData);
  };

  return (
    data && (
      <PersonalDataForm data={data} handlePersonalDataPost={handlePersonalDataPost} mutationLoading={mutationLoading} />
    )
  );
};

export default FillUpPersonalDataPage;
