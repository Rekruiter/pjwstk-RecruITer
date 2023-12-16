import { PropsWithChildren, useEffect, useState } from 'react';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
import { ScrollRestoration } from 'react-router-dom';

interface LayoutProps {
  withoutMargin?: boolean;
  panel?: boolean;
}

const Layout = ({ children, withoutMargin = false, panel }: PropsWithChildren<LayoutProps>) => {
  const [navbarBackground, setNavbarBackground] = useState('bg-transparent fixed');
  useEffect(() => {
    if (!withoutMargin) {
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarBackground('bg-dark_blue/80 fixed');
      } else {
        setNavbarBackground('bg-transparent fixed');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [withoutMargin]);

  return (
    <div className="flex min-w-mobile flex-col">
      <ScrollRestoration />
      <Navigation className={withoutMargin ? navbarBackground : 'sticky bg-dark_blue'} />
      <div className={`min-h-screen-navbar flex flex-1 flex-col`}>{children}</div>
      {!panel && <Footer />}
    </div>
  );
};

export default Layout;
