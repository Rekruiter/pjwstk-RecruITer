import Modal from '../UI/Modal/Modal';
import ExitIcon from '../../assets/exit_icon.svg';
import { AuthMethodType } from '../../helpers/getAuthMethod';
import LoginForm from '../AuthForms/LoginForm';
import RegisterForm from '../AuthForms/RegisterForm';
import ForgotPasswordForm from '../AuthForms/ForgotPasswordForm';
import { IoMdArrowBack } from 'react-icons/io';
import { useState } from 'react';
import _debounce from 'lodash.debounce';

interface AuthModalInterface {
  handleRemoveAuthorization: () => void;
  authMethod: AuthMethodType;
  changeAuthMethod: (method: AuthMethodType) => void;
  name?: string;
}

const AuthModal = ({ handleRemoveAuthorization, authMethod, changeAuthMethod }: AuthModalInterface) => {
  const [isHiding, setIsHiding] = useState(false);

  const debounceHideLogin = _debounce(() => {
    handleRemoveAuthorization();
  }, 500);

  const handleCloseModal = () => {
    setIsHiding(true);
    debounceHideLogin();
  };

  return (
    <Modal onClose={handleCloseModal} hiding={isHiding}>
      <div className={`grid flex-grow rounded-xl bg-dark p-4`}>
        <div className="flex w-full items-start">
          {authMethod === 'reset-password' && (
            <button onClick={() => changeAuthMethod('login')} className="text-white">
              <IoMdArrowBack size={20} />
            </button>
          )}
          <button onClick={handleCloseModal} className="ml-auto">
            <img src={ExitIcon} alt="X" className="max-h-full" />
          </button>
        </div>
        <div className="overflow-y-auto">
          {authMethod === 'login' && <LoginForm changeAuthMethod={changeAuthMethod} />}
          {authMethod === 'register' && <RegisterForm changeAuthMethod={changeAuthMethod} />}
          {authMethod === 'reset-password' && <ForgotPasswordForm />}
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
