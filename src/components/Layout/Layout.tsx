import { PropsWithChildren, useEffect, useState } from 'react';
import Navigation from './Navigation/Navigation';

interface LayoutProps {
  withoutMargin?: boolean;
}

const Layout = ({ children, withoutMargin = false }: PropsWithChildren<LayoutProps>) => {
  const [navbarBackground, setNavbarBackground] = useState('bg-transparent');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarBackground('bg-dark_blue'); // Change to your desired background color class
      } else {
        setNavbarBackground('bg-transparent');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen min-w-mobile">
      <Navigation className={navbarBackground} />
      <div className={`flex flex-grow ${!withoutMargin ? 'mt-36' : ''}`}>{children}</div>
      <div className="h-12 basis-24">footer</div>
    </div>
  );
};

export default Layout;
