import { PropsWithChildren, useEffect, useState } from 'react';
import Navigation from './Navigation/Navigation';

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
    <div className="flex flex-col min-h-screen min-w-mobile">
      <Navigation className={withoutMargin ? navbarBackground : 'bg-dark_blue sticky'} />
      <div className={`flex-1 flex flex-col`}>{children}</div>
      {!panel && (
        <div className="w-full bg-dark_blue text-light min-h-6">
          <div className="container px-10 md:px-24">footer</div>
        </div>
      )}
    </div>
  );
};

export default Layout;
