import Button from '../UI/Button';
import Modal from '../UI/Modal/Modal';
import ExitIcon from '../../assets/exit_icon.svg';
import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth-context';
import Spinner from '../UI/Spinner/Spinner';

const LoginNavbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const authCtx = useContext(AuthContext);
  const [isLoggingIn, setIsLoggingIn] = useState(searchParams.get('authorization') === 'login');
  const [isHiding, setIsHiding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isHiding) {
      return;
    }

    const debounceTimer = setTimeout(() => {
      setIsLoggingIn(false);
      setIsHiding(false);
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [isHiding]);

  const handleCloseModal = () => {
    setSearchParams((prevParams) => {
      prevParams.delete('authorization');
      return prevParams;
    });
    setIsHiding(true);
  };

  const handleOpenModal = () => {
    setSearchParams((prevParams) => {
      prevParams.delete('authorization');
      prevParams.append('authorization', 'login');
      return prevParams;
    });
    setIsLoggingIn(true);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      authCtx.login({
        role: 'admin',
        token: 'testtoken1',
      });
      setIsLoggingIn(false);
      setSearchParams(() => new URLSearchParams());
      setIsLoading(false);
    }, 2000);
  };

  const handleLogout = () => {
    authCtx.logout();
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
              <div>
                <Button className="shadow-md min-w-loginButton" type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner /> : 'Log in'}
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LoginNavbar;
