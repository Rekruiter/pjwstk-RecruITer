import Button from '../UI/Button';
import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth-context';
import _debounce from 'lodash.debounce';
import LoginDropdownMenu from './LoginDropdownMenu/LoginDropdownMenu';
import LoginModal from './LoginModal';

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

  const handleLoginButton = (role: 'user' | 'candidate' | 'techRecruiter' | 'recruiter' | 'admin') => {
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
        <LoginDropdownMenu onLogout={handleLogout} />
      ) : (
        <Button className="shadow-md" onClick={handleOpenModal}>
          Log in
        </Button>
      )}
      {isLoggingIn && (
        <LoginModal
          handleCloseModal={handleCloseModal}
          handleLogin={handleLogin}
          handleLoginButton={handleLoginButton}
          isHiding={isHiding}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default LoginNavbar;
