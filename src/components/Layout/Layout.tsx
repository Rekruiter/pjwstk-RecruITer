import { PropsWithChildren } from 'react';
import Navigation from './Navigation/Navigation';
import KeyboardImage from '../../assets/keyboard.png';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navigation />
      <div className="relative overflow-hidden">
        <div
          className="absolute bg-cover bg-center w-full top-0 bottom-0 opacity-30"
          style={{
            backgroundImage: `url(${KeyboardImage})`,
          }}></div>
        <div className="flex flex-grow h-96 py-96">{children}</div>
      </div>
      <div className="flex flex-grow h-96 py-96">{children}</div>
      <div className="flex flex-grow h-96 py-96">{children}</div>
      <div className="h-12 basis-24">footer</div>
    </div>
  );
};

export default Layout;
