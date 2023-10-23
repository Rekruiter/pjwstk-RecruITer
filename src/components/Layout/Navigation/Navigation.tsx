import { Link, NavLink } from 'react-router-dom';
import logoImage from '../../../assets/logo.png';
import { useState } from 'react';
import LoginNavbar from '../../LoginNavbar/LoginNavbar';

interface NavigationsProps {
  className: string;
}

const Navigation = ({ className }: NavigationsProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const isLoggedIn = false; // TODO: Fetch this from redux store

  const toggleNavigation = () => {
    setIsOpened((prevState) => !prevState);
  };

  return (
    <>
      <nav className={`${className} w-full fixed top-0 z-10`}>
        <div className="container my-2 md:my-6 mx-auto px-10 md:px-24 flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex justify-between">
            <Link to={'/'} className="text-white text-lg font-bold h-24">
              <img src={logoImage} className="max-h-full" />
            </Link>
            <button className="md:hidden" onClick={toggleNavigation}>
              <svg
                className="h-6 w-6 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
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
            className={`w-full ${
              isOpened ? 'flex flex-col' : 'hidden'
            } md:flex md:flex-row md:w-auto gap-4 xl:gap-14 items-center`}>
            <NavLink
              className="text-gray-300 hover:text-white rounded-md text-base font-medium"
              to="/">
              Home
            </NavLink>
            <NavLink
              className="text-gray-300 hover:text-white rounded-md ext-base font-medium"
              to="/applications">
              Applications
            </NavLink>
            <NavLink
              className="text-gray-300 hover:text-white rounded-md ext-base font-medium"
              to="/job-offers">
              Job offers
            </NavLink>
            <NavLink
              className="text-gray-300 hover:text-white rounded-md ext-base font-medium"
              to="/recruitments">
              Recruitments
            </NavLink>
            {!isLoggedIn ? <LoginNavbar /> : <div>logged in user logo</div>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
