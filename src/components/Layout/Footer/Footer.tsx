import { Link } from 'react-router-dom';
import EmailIcon from '../../../assets/email_icon.svg';
import ContactIcon from '../../../assets/phone_icon.svg';

const Footer = () => {
  return (
    <div className="w-full bg-light_blue min-h-6">
      <div className="container p-2 md:px-10 xl:px-24 text-dark flex flex-col py-10 gap-2">
        <h4 className="text-xl font-semibold">RecruITer</h4>
        <div className="w-full flex flex-col sm:flex-row gap-16 sm:gap-8 md:gap-28 lg:gap-40">
          <div className="flex flex-col gap-3 mt-10">
            <div className="flex gap-6">
              <img src={EmailIcon} />
              <p>Contact us</p>
            </div>
            <p>support@recruiter.com</p>
            <div className="flex gap-6 mt-4">
              <img src={ContactIcon} className="relative -left-1" />
              <p>Phone</p>
            </div>
            <p>+48 123 456 789</p>
          </div>
          <div className="flex-grow flex">
            <div className="basis-1/3 flex flex-col gap-12 max-h-full relative pl-5 pr-1">
              <div className="h-40 w-0.25 bg-dark absolute left-0 top-10" />
              <h5 className="font-semibold text-base">About</h5>
              <div className="flex flex-col gap-2">
                <Link to="/">Career</Link>
                <Link to="/">Events</Link>
                <Link to="/">Cookie settings</Link>
              </div>
            </div>
            <div className="basis-1/3 flex flex-col gap-12 max-h-full relative pl-5 pr-1">
              <div className="h-40 w-0.25 bg-dark absolute left-0 top-10" />
              <h5 className="font-semibold text-base">Candidates</h5>
              <div className="flex flex-col gap-2">
                <Link to="/">Job offers</Link>
                <Link to="/">My profile</Link>
                <Link to="/">Blog</Link>
                <Link to="/">Companies</Link>
              </div>
            </div>
            <div className="basis-1/3 flex flex-col gap-12 max-h-full relative pl-5 pr-1">
              <div className="h-40 w-0.25 bg-dark absolute left-0 top-10" />
              <h5 className="font-semibold text-base">About</h5>
              <div className="flex flex-col gap-2">
                <Link to="/">Start hiring</Link>
                <Link to="/">Pricing</Link>
                <Link to="/">Post a job</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
