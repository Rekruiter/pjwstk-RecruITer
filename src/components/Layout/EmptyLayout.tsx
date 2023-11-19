import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo.png';

interface EmptyLayoutProps {
  children: React.ReactNode;
}

const EmptyLayout = ({ children }: EmptyLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen min-w-mobile">
      <div className="py-2 px-10 md:px-24 flex flex-col md:flex-row md:items-center justify-between bg-dark_blue">
        <div className="flex justify-between">
          <Link to={'/'} className="text-white text-lg font-bold h-20">
            <img src={logoImage} className="max-h-full" />
          </Link>
        </div>
      </div>
      <div className={`flex-1 flex flex-col`}>{children}</div>
      <div className="w-full bg-dark_blue text-light min-h-6">
        <div className="container px-10 md:px-24">footer</div>
      </div>
    </div>
  );
};

export default EmptyLayout;
