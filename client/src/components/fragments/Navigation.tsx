import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-gray-800 w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={"/"} className="text-white text-lg font-bold">
              Logo
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                href="/">
                Home
              </a>
              <a
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                href="/about">
                About
              </a>
              <a
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                href="/contact">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
