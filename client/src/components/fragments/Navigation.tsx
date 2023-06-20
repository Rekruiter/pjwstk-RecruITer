import { Link } from "react-router-dom";
import logoImage from "../../assets/logo.png";

export default function Navigation() {
  return (
    <nav className="bg-gray-800 m-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-row gap-5 items-center">
            <Link to={"/"} className="text-white text-lg font-bold h-16">
              <img src={logoImage} className="w-full h-full" />
            </Link>
            <h1 className="font-sans text-2xl font-bold">RecruITer</h1>
          </div>
          <div className="hidden md:block w-3/4">
            <div className="flex space-x-4">
              <Link
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                to="/">
                Home
              </Link>
              <Link
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md ext-base font-medium"
                to="/applications">
                Applications
              </Link>
              <Link
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md ext-base font-medium"
                to="/job-offers">
                Job offers
              </Link>
              <Link
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md ext-base font-medium"
                to="/recruitments">
                Recruitments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
