import Button from '../UI/Button';
import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth-context';
import _debounce from 'lodash.debounce';
import LoginDropdownMenu from './AuthorizedDropdownMenu/AuthorizedDropdownMenu';
import AuthModal from './AuthModal';
import { AuthMethodType, getAuthMethod } from '../../helpers/getAuthMethod';

const AuthNavbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const authCtx = useContext(AuthContext);
  const [isHiding, setIsHiding] = useState(false);

  const authMethod = getAuthMethod(searchParams.get('authorization'));

  const handleRemoveAuthorization = () => {
    setSearchParams((prevParams) => {
      prevParams.delete('authorization');
      return prevParams;
    });
  };

  useEffect(() => {
    if (searchParams.get('authorization') && authCtx.isLoggedIn) {
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

  const handleOpenLoginModal = () => {
    setSearchParams((prevParams) => {
      return new URLSearchParams({ ...prevParams, authorization: 'login' });
    });
  };

  const handleLogout = () => {
    authCtx.logout();
  };

  const changeAuthMethod = (method: AuthMethodType) => {
    setSearchParams((prevParams) => new URLSearchParams({ ...prevParams, authorization: method }));
  };

  return (
    <>
      {authCtx.isLoggedIn ? (
        <LoginDropdownMenu onLogout={handleLogout} name={authCtx.name} />
      ) : (
        <>
          <Button className="shadow-md" onClick={handleOpenLoginModal}>
            Log in
          </Button>
          {authMethod && (
            <AuthModal
              handleCloseModal={handleCloseModal}
              isHiding={isHiding}
              authMethod={authMethod}
              changeAuthMethod={changeAuthMethod}
            />
          )}
        </>
      )}
    </>
  );
};

export default AuthNavbar;
