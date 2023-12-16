import { Link, NavLink } from 'react-router-dom';
import logoImage from '../../../assets/logo.png';
import { useContext, useState } from 'react';
import AuthNavbar from '../../AuthNavbar/AuthNavbar';
import AuthContext from '../../../context/auth-context';
import { IAuthorizationObject } from '../../../types/authorizationTypes';
import { headerDefaultRoles, headerPathsByRole } from '../../../constants/paths';

interface NavigationsProps {
  className: string;
}
const getNavLinks = (role?: IAuthorizationObject['role']) => {
  const headerLinks = role ? headerPathsByRole[role] : headerDefaultRoles;
  return (
    <>
      {headerLinks.map((link) => (
        <NavLink
          key={link.path}
          className={({ isActive }) =>
            `rounded-md text-base font-medium hover:text-white ${
              isActive ? 'text-light underline decoration-orange underline-offset-8' : 'text-gray-300'
            }`
          }
          to={link.path}>
          {link.headerSignature}
        </NavLink>
      ))}
    </>
  );
};

const Navigation = ({ className }: NavigationsProps) => {
  const authCtx = useContext(AuthContext);
  const [isOpened, setIsOpened] = useState(false);

  const toggleNavigation = () => {
    setIsOpened((prevState) => !prevState);
  };

  return (
    <>
      <nav className={`${className} top-0 z-10 w-full`}>
        <div className="flex flex-col justify-between px-10 py-2 md:flex-row md:items-center md:px-24">
          <div className="flex justify-between">
            <Link to={'/'} className="h-20 text-lg font-bold text-white">
              <img src={logoImage} className="max-h-full" />
            </Link>
            <button className="md:hidden" onClick={toggleNavigation}>
              <svg className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                {isOpened ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.293 5.293a1 1 0 011.414 0L12 13.586l7.293-7.293a1 1 0 111.414 1.414l-8 8a1 1 0 01-1.414 0l-8-8a1 1 0 010-1.414z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6a1 1 0 011-1h14a1 1 0 010 2H5a1 1 0 01-1-1zm0 4a1 1 0 011-1h14a1 1 0 010 2H5a1 1 0 01-1-1zm0 4a1 1 0 011-1h7a1 1 0 010 2H5a1 1 0 01-1-1z"
                  />
                )}
              </svg>
            </button>
          </div>
          <div
            className={`flex w-full flex-col ${
              !isOpened ? 'hidden' : ''
            } items-center gap-4 md:flex md:w-auto md:flex-row xl:gap-14`}>
            {getNavLinks(authCtx.role)}
            {<AuthNavbar />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
