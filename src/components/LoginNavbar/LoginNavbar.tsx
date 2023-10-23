import Button from '../UI/Button';
import Modal from '../UI/Modal/Modal';
import ExitIcon from '../../assets/exit_icon.svg';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LoginNavbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoggingIn, setIsLoggingIn] = useState(searchParams.get('authorization') === 'login');
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const isLogin = searchParams.get('authorization') === 'login';
    if (isLogin) {
      setIsLoggingIn(true);
      return;
    }

    const debounceTimer = setTimeout(() => {
      setIsLoggingIn(false);
      setIsHiding(false);
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchParams]);
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
  };
  return (
    <>
      <Button className="shadow-md" onClick={handleOpenModal}>
        Log in
      </Button>
      {isLoggingIn && (
        <Modal onClose={handleCloseModal} hiding={isHiding}>
          <div className="flex-grow rounded-xl bg-dark_blue flex flex-col p-4 gap-16 justify-between items-center">
            <div className="w-full text-end">
              <button onClick={handleCloseModal}>
                <img src={ExitIcon} alt="X" className="max-h-full" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <input placeholder="E-mail" className="rounded" />
              <input placeholder="Password" className="rounded" />
            </div>
            <div>
              <Button className="" onClick={handleOpenModal}>
                Log in
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LoginNavbar;
