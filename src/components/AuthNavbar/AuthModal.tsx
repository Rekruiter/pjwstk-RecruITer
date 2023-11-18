import Modal from '../UI/Modal/Modal';
import ExitIcon from '../../assets/exit_icon.svg';
import { AuthMethodType } from '../../helpers/getAuthMethod';
import LoginForm from '../AuthForms/LoginForm';
import RegisterForm from '../AuthForms/RegisterForm';
import { useLocation } from 'react-router-dom';
import ForgotPasswordForm from '../AuthForms/ForgotPasswordForm';
import { IoMdArrowBack } from 'react-icons/io';

interface AuthModalInterface {
  handleCloseModal: () => void;
  isHiding: boolean;
  authMethod: AuthMethodType;
  changeAuthMethod: (method: AuthMethodType) => void;
  name?: string;
}

const AuthModal = ({ handleCloseModal, isHiding, authMethod, changeAuthMethod }: AuthModalInterface) => {
  const location = useLocation();

  return (
    <Modal onClose={handleCloseModal} hiding={isHiding}>
      <div className={`flex-grow rounded-xl ${location.pathname === '/' ? 'bg-black/10' : 'bg-dark/80'} p-4 grid`}>
        <div className="w-full flex items-start">
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
