import React from 'react';
import Modal from '../UI/Modal/Modal';
import ExitIcon from '../../assets/exit_icon.svg';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner/Spinner';

interface LoginModalInterface {
  handleCloseModal: () => void;
  isHiding: boolean;
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleLoginButton: (role: 'user' | 'candidate' | 'techRecruiter' | 'recruiter' | 'admin') => void;
  isLoading: boolean;
}

const LoginModal = ({ handleCloseModal, isHiding, handleLogin, handleLoginButton, isLoading }: LoginModalInterface) => {
  return (
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
  );
};

export default LoginModal;
