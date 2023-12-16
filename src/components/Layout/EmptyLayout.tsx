import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo.png';

interface EmptyLayoutProps {
  children: React.ReactNode;
}

const EmptyLayout = ({ children }: EmptyLayoutProps) => {
  return (
    <div className="flex min-h-screen min-w-mobile flex-col">
      <div className="flex flex-col justify-between bg-dark_blue px-10 py-2 md:flex-row md:items-center md:px-24">
        <div className="flex justify-between">
          <Link to={'/'} className="h-20 text-lg font-bold text-white">
            <img src={logoImage} className="max-h-full" />
          </Link>
        </div>
      </div>
      <div className={`flex flex-1 flex-col`}>{children}</div>
      <div className="min-h-6 w-full bg-dark_blue text-light">
        <div className="container px-10 md:px-24">footer</div>
      </div>
    </div>
  );
};

export default EmptyLayout;
