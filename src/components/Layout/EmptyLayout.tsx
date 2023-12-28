import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo.png';
import Footer from './Footer/Footer';

interface EmptyLayoutProps {
  children: React.ReactNode;
}

const EmptyLayout = ({ children }: EmptyLayoutProps) => {
  return (
    <div className="flex min-w-mobile flex-col">
      <div className="flex flex-col justify-between bg-dark_blue px-10 py-2 md:flex-row md:items-center md:px-24">
        <div className="flex justify-between">
          <Link to={'/'} className="h-20 text-lg font-bold text-white">
            <img src={logoImage} className="max-h-full" />
          </Link>
        </div>
      </div>
      <div className={`min-h-screen-navbar flex flex-1 flex-col`}>{children}</div>
      <Footer />
    </div>
  );
};

export default EmptyLayout;
