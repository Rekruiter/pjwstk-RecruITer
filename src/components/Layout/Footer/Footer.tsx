import { Link } from 'react-router-dom';
import EmailIcon from '../../../assets/email_icon.svg';
import ContactIcon from '../../../assets/phone_icon.svg';

const Footer = () => {
  return (
    <div className="min-h-6 w-full bg-light_blue">
      <div className="container flex flex-col gap-2 p-2 py-10 text-dark md:px-10 xl:px-24">
        <h4 className="text-xl font-semibold">RecruITer</h4>
        <div className="flex w-full flex-col gap-16 sm:flex-row sm:gap-8 md:gap-28 lg:gap-40">
          <div className="mt-10 flex flex-col gap-3">
            <div className="flex gap-6">
              <img src={EmailIcon} />
              <p>Contact us</p>
            </div>
            <p>support@recruiter.com</p>
            <div className="mt-4 flex gap-6">
              <img src={ContactIcon} className="relative -left-1" />
              <p>Phone</p>
            </div>
            <p>+48 123 456 789</p>
          </div>
          <div className="flex flex-grow">
            <div className="relative flex max-h-full basis-1/3 flex-col gap-12 pl-5 pr-1">
              <div className="absolute left-0 top-10 h-40 w-0.25 bg-dark" />
              <h5 className="text-base font-semibold">About</h5>
              <div className="flex flex-col gap-2">
                <Link to="/">Career</Link>
                <Link to="/">Events</Link>
                <Link to="/">Cookie settings</Link>
              </div>
            </div>
            <div className="relative flex max-h-full basis-1/3 flex-col gap-12 pl-5 pr-1">
              <div className="absolute left-0 top-10 h-40 w-0.25 bg-dark" />
              <h5 className="text-base font-semibold">Candidates</h5>
              <div className="flex flex-col gap-2">
                <Link to="/">Job offers</Link>
                <Link to="/">My profile</Link>
                <Link to="/">Blog</Link>
                <Link to="/">Companies</Link>
              </div>
            </div>
            <div className="relative flex max-h-full basis-1/3 flex-col gap-12 pl-5 pr-1">
              <div className="absolute left-0 top-10 h-40 w-0.25 bg-dark" />
              <h5 className="text-base font-semibold">About</h5>
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
