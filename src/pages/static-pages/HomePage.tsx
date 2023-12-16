import KeyboardImage from '../../assets/keyboard.png';
import Button from '../../components/UI/Button';
import TechnologiesCloudImage from '../../assets/technologies_cloud.png';
import BusinessWomanImage from '../../assets/business_woman.png';
import { Link, useSearchParams } from 'react-router-dom';
import { Paths } from '@/constants/paths';

const HomePage = () => {
  const [, setSearchParams] = useSearchParams();
  return (
    <>
      <section
        className="flex min-h-screen w-full flex-col justify-center"
        style={{
          background: `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.25)), url(${KeyboardImage})`,
          backgroundSize: 'cover',
        }}>
        <div className="container flex flex-col gap-6 px-2">
          <h2 className="text-4xl text-light sm:w-[32rem] sm:text-5xl">MAKE CODING RECRUITMENTS EASY AND PRODUCTIVE</h2>
          <p className="text-light">
            New tool to proceed programming recruitments at
            <br />
            <span className="drop-shadow-xl">another level of efficiency</span>
          </p>
          <Button
            className="sm:w-fit"
            onClick={() =>
              setSearchParams((prevParams) => {
                return new URLSearchParams({ ...prevParams, authorization: 'register' });
              })
            }>
            Join US
          </Button>
        </div>
      </section>
      <section className="flex min-h-screen w-full flex-col justify-center bg-light_blue py-28">
        <div className="container relative flex flex-col gap-16 px-2">
          <h3 className="text-center text-4xl font-semibold leading-[3.25rem] text-dark">
            MASTER YOUR FAVOURITE TECHNOLOGIES
            <br />
            AT TRAINING SECTION
          </h3>
          <div className="absolute right-0 top-10 hidden xl:block">
            <img src={TechnologiesCloudImage} />
          </div>
          <h4 className="text-2xl text-dark">
            Our System provides section where you can learn to your interviews <br />
            based from real recruiters’ question database.
          </h4>
          <div className="flex w-full flex-col gap-7 px-20 text-dark">
            <div className="flex max-w-[30rem] flex-col gap-5 self-start">
              <h5 className="text-lg font-semibold">🚀 Dive Into Tailored Tech Tracks</h5>
              <p>
                Navigate through our extensive library of theoretical questions, categorized into specific technologies
                and programming languages such as <span className="font-semibold">JavaScript, Python, Java</span>, and
                many more.
              </p>
            </div>
            <div className="flex max-w-[30rem] flex-col gap-5 md:self-end">
              <h5 className="text-lg font-semibold">🔍 Real Recruiters’ Question Database</h5>
              <p>
                Equip yourself with insights from our robust database of
                <span className="font-semibold"> actual interview questions</span>, pooled from recruiters and
                experienced professionals. Organized by difficulty, question type, and technology.
              </p>
            </div>
            <div className="flex max-w-[30rem] flex-col gap-5 self-start">
              <h5 className="text-lg font-semibold">
                🧠 Challenge Your Coding Prowess - <br />
                Practical Programming Problems
              </h5>
              <p>
                Embark on an enriching journey through our curated assortment of practical programming problems, devised
                by
                <span className="font-semibold">seasoned tech interviewers</span> and industry experts
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-8">
            <h4 className="text-3xl font-semibold text-dark">Create account and start preparing yourself</h4>
            <Button className="w-fit">Sign up</Button>
          </div>
        </div>
      </section>
      <section className="flex min-h-screen w-full flex-col justify-center bg-dark_blue py-20">
        <div className="container relative flex flex-col gap-28 px-2">
          <img src={BusinessWomanImage} className="absolute -top-10 right-0 hidden max-h-[80vh] xl:block" />
          <h3 className="text-5xl font-normal text-light">ARE YOU AN EMPLOYER...?</h3>
          <div className="flex max-w-2xl flex-col gap-10 text-lg text-light">
            <p>
              Trust our professional approach and join as an company to our community ! At{' '}
              <span className="font-semibold">RecruITer</span>, we meticulously create symbiotic environments where your
              esteemed organization and adept candidates converge to create innovative future tech landscapes
            </p>
            <p>🎯 Place Your Job Offers - Connecting Employers and Potential Talent</p>
            <p>🛠 Add Your Technical and Practical Exercises - Shape the Future Skillset</p>
            <p>🔄 Perform Recruitment Process - Streamlining Hiring to its Best</p>
            <p>💼 Process Technical Interview - Uncover True Potential</p>
            <p>👥 Manage Candidates - A Central Hub for All Your Recruitment Needs</p>
            <p>
              And many more... navigate to{' '}
              <Link to={Paths.company.path} className="text-orange underline">
                Employers Section
              </Link>{' '}
              to see more details
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
