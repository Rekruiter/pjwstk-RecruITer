import Button from '../UI/Button';
import Modal from '../UI/Modal/Modal';
import ExitIcon from '../../assets/exit_icon.svg';
import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth-context';
import Spinner from '../UI/Spinner/Spinner';
import _debounce from 'lodash.debounce';

const LoginNavbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const authCtx = useContext(AuthContext);
  const [isHiding, setIsHiding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggingIn = searchParams.get('authorization') === 'login' && !authCtx.isLoggedIn;

  const handleRemoveAuthorization = () => {
    setSearchParams((prevParams) => {
      prevParams.delete('authorization');
      return prevParams;
    });
  };

  useEffect(() => {
    if (searchParams.get('authorization') === 'login' && authCtx.isLoggedIn) {
      handleRemoveAuthorization();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounceHideLogin = _debounce(() => {
    handleRemoveAuthorization();
    setIsHiding(false);
  }, 300);

  const handleCloseModal = () => {
    setIsHiding(true);
    debounceHideLogin();
  };

  const handleOpenModal = () => {
    setSearchParams((prevParams) => {
      prevParams.set('authorization', 'login');
      return prevParams;
    });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      authCtx.login({
        role: 'admin',
        token: 'testtoken1',
      });
      setSearchParams(() => new URLSearchParams(), { replace: true });
      setIsLoading(false);
    }, 2000);
  };

  const handleLogout = () => {
    authCtx.logout();
  };

  const handleLoginButton = (
    role: 'user' | 'candidate' | 'techRecruiter' | 'recruiter' | 'admin',
  ) => {
    setIsLoading(true);
    setTimeout(() => {
      authCtx.login({
        role: role,
        token: 'testtoken1',
      });
      setSearchParams(() => new URLSearchParams(), { replace: true });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      {authCtx.isLoggedIn ? (
        <Button className="shadow-md" onClick={handleLogout}>
          Log out
        </Button>
      ) : (
        <Button className="shadow-md" onClick={handleOpenModal}>
          Log in
        </Button>
      )}
      {isLoggingIn && (
        <Modal onClose={handleCloseModal} hiding={isHiding}>
          <div className="flex-grow rounded-xl bg-dark_blue p-4 grid">
            <div className="w-full text-end ">
              <button onClick={handleCloseModal}>
                <img src={ExitIcon} alt="X" className="max-h-full" />
              </button>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col items-center justify-between">
              <div className="flex flex-col gap-2">
                <input placeholder="E-mail" className="rounded" />
                <input placeholder="Password" className="rounded" />
              </div>
              <div className="flex flex-row">
                <Button
                  className="shadow-md min-w-loginButton"
                  type="button"
                  onClick={() => handleLoginButton('techRecruiter')}
                  disabled={isLoading}>
                  {isLoading ? <Spinner /> : 'Tech Recruiter'}
                </Button>
                <Button
                  className="shadow-md min-w-loginButton"
                  type="button"
                  onClick={() => handleLoginButton('recruiter')}
                  disabled={isLoading}>
                  {isLoading ? <Spinner /> : 'Recruiter'}
                </Button>
                <Button
                  className="shadow-md min-w-loginButton"
                  type="button"
                  onClick={() => handleLoginButton('user')}
                  disabled={isLoading}>
                  {isLoading ? <Spinner /> : 'user'}
                </Button>
                <Button
                  className="shadow-md min-w-loginButton"
                  type="button"
                  onClick={() => handleLoginButton('candidate')}
                  disabled={isLoading}>
                  {isLoading ? <Spinner /> : 'candidate'}
                </Button>
                <Button
                  className="shadow-md min-w-loginButton"
                  type="button"
                  onClick={() => handleLoginButton('admin')}
                  disabled={isLoading}>
                  {isLoading ? <Spinner /> : 'admin'}
                </Button>
                {/* <Button
                  className="shadow-md min-w-loginButton"
                  type="submit"
                  disabled={isLoading}>
                  {isLoading ? <Spinner /> : 'Log in'}
                </Button> */}
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LoginNavbar;
