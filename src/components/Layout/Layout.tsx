import { PropsWithChildren, useEffect, useState } from 'react';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';

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
    <div className="flex min-h-screen min-w-mobile flex-col">
      <Navigation className={withoutMargin ? navbarBackground : 'sticky bg-dark_blue'} />
      <div className={`flex flex-1 flex-col`}>{children}</div>
      {!panel && <Footer />}
    </div>
  );
};

export default Layout;
