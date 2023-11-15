import { Link, NavLink } from 'react-router-dom';
import logoImage from '../../../assets/logo.png';
import { useContext, useState } from 'react';
import LoginNavbar from '../../LoginNavbar/LoginNavbar';
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
            `hover:text-white rounded-md text-base font-medium ${
              isActive ? 'text-light underline underline-offset-8 decoration-orange' : 'text-gray-300'
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
      <nav className={`${className} w-full fixed top-0 z-10`}>
        <div className="container py-2 px-10 md:px-24 flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex justify-between">
            <Link to={'/'} className="text-white text-lg font-bold h-20">
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
            className={`w-full flex flex-col ${
              !isOpened ? 'hidden' : ''
            } md:flex md:flex-row md:w-auto gap-4 xl:gap-14 items-center`}>
            {getNavLinks(authCtx.role)}
            {<LoginNavbar />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
