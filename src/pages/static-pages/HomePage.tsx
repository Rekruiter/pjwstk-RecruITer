import KeyboardImage from '../../assets/keyboard.png';
import Button from '../../components/UI/Button';
import TechnologiesCloudImage from '../../assets/technologies_cloud.png';
import BusinessWomanImage from '../../assets/business_woman.png';
import { Link, useSearchParams } from 'react-router-dom';
import { Paths } from '@/constants/paths';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

const HomePage = () => {
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const opacityObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
        } else {
          entry.target.classList.remove('opacity-100');
        }
      });
    });

    const leftSlideObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('translate-x-0', 'opacity-100');
          entry.target.classList.remove('-translate-x-full');
        } else {
          entry.target.classList.remove('translate-x-0', 'opacity-100');
          entry.target.classList.add('-translate-x-full');
        }
      });
    });

    const rightSlideObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('translate-x-0', 'opacity-100');
          entry.target.classList.remove('translate-x-full');
        } else {
          entry.target.classList.remove('translate-x-0', 'opacity-100');
          entry.target.classList.add('translate-x-full');
        }
      });
    });

    const leftSlideElements = document.querySelectorAll('.observer-slide-left');
    const rightSlideElements = document.querySelectorAll('.observer-slide-right');

    const opacityElements = document.querySelectorAll('.observer-hidden');

    leftSlideElements.forEach((element) => {
      leftSlideObserver.observe(element);
    });

    rightSlideElements.forEach((element) => {
      rightSlideObserver.observe(element);
    });

    opacityElements.forEach((element) => {
      opacityObserver.observe(element);
    });

    return () => {
      leftSlideElements.forEach((element) => {
        leftSlideObserver.unobserve(element);
      });

      rightSlideElements.forEach((element) => {
        rightSlideObserver.unobserve(element);
      });

      opacityElements.forEach((element) => {
        opacityObserver.unobserve(element);
      });
    };
  }, []);

  const transitionOpacity = 'observer-hidden opacity-0 transition ease-in-out motion-reduce:transition-none';

  const transitionLeft =
    'observer-slide-left -translate-x-full transform opacity-0 transition ease-in-out motion-reduce:transition-none';

  const transitionRight =
    'observer-slide-right translate-x-full transform opacity-0 transition ease-in-out motion-reduce:transition-none';

  return (
    <>
      <section
        className="flex min-h-screen w-full flex-col justify-center"
        style={{
          background: `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.25)), url(${KeyboardImage})`,
          backgroundSize: 'cover',
        }}>
        <div className="container mt-24 flex flex-col gap-6 px-2 first:duration-700 sm:px-12 2xl:px-0 [&>*:nth-child(1)]:duration-300 [&>*:nth-child(2)]:duration-500 [&>*:nth-child(3)]:duration-700">
          <h2 className={cn('text-2xl text-light sm:w-[32rem] sm:text-5xl', transitionLeft)}>
            MAKE CODING RECRUITMENTS EASY AND PRODUCTIVE
          </h2>
          <p className={cn('text-xs text-light sm:text-sm', transitionLeft)}>
            New tool to proceed programming recruitments at
            <br />
            <span className="drop-shadow-xl">another level of efficiency</span>
          </p>
          <Button
            className={cn('sm:w-fit', transitionLeft)}
            onClick={() =>
              setSearchParams((prevParams) => {
                return new URLSearchParams({ ...prevParams, authorization: 'register' });
              })
            }>
            Join US
          </Button>
        </div>
      </section>
      <section className="flex min-h-screen w-full flex-col justify-center overflow-hidden bg-light_blue px-6 py-28">
        <div className="container relative flex flex-col gap-16 px-2 [&>*:nth-child(1)]:duration-700 [&>*:nth-child(3)]:duration-700">
          <h3
            className={cn(
              'text-center text-2xl font-semibold text-dark sm:text-3xl sm:leading-[3.25rem]',
              transitionOpacity,
            )}>
            MASTER YOUR FAVOURITE TECHNOLOGIES
            <br />
            AT TRAINING SECTION
          </h3>
          <div className="absolute right-0 top-10 hidden xl:block">
            <img src={TechnologiesCloudImage} />
          </div>
          <h4 className={cn('text-lg text-dark sm:text-2xl', transitionOpacity)}>
            Our System provides section where you can learn to your interviews <br />
            based from real recruiters’ question database.
          </h4>
          <div className="flex w-full flex-col gap-7 px-20 text-dark [&>*:nth-child(1)]:duration-700 [&>*:nth-child(2)]:duration-700 [&>*:nth-child(3)]:duration-700">
            <div className={cn('flex max-w-[30rem] flex-col gap-5 self-start', transitionLeft)}>
              <h5 className="text-lg font-semibold">🚀 Dive Into Tailored Tech Tracks</h5>
              <p className="text-sm">
                Navigate through our extensive library of theoretical questions, categorized into specific technologies
                and programming languages such as <span className="font-semibold">JavaScript, Python, Java</span>, and
                many more.
              </p>
            </div>
            <div className={cn('flex max-w-[30rem] flex-col gap-5 md:self-end', transitionRight)}>
              <h5 className="text-lg font-semibold">🔍 Real Recruiters’ Question Database</h5>
              <p className="text-sm">
                Equip yourself with insights from our robust database of
                <span className="font-semibold"> actual interview questions</span>, pooled from recruiters and
                experienced professionals. Organized by difficulty, question type, and technology.
              </p>
            </div>
            <div className={cn('flex max-w-[30rem] flex-col gap-5 self-start', transitionLeft)}>
              <h5 className="text-lg font-semibold">
                🧠 Challenge Your Coding Prowess - <br />
                Practical Programming Problems
              </h5>
              <p className="text-sm">
                Embark on an enriching journey through our curated assortment of practical programming problems, devised
                by
                <span className="font-semibold">seasoned tech interviewers</span> and industry experts
              </p>
            </div>
          </div>
          <div
            className={cn('flex w-full flex-col items-center justify-center gap-8 duration-1000', transitionOpacity)}>
            <h4 className="text-center text-xl font-semibold text-dark sm:text-2xl">
              Create account and start preparing yourself
            </h4>
            <Button className="w-fit">Sign up</Button>
          </div>
        </div>
      </section>
      <section className="flex min-h-screen w-full flex-col justify-center bg-dark_blue py-20">
        <div className="container relative flex justify-between">
          <div className="bg-dark/15 flex w-max flex-col gap-28 rounded-md p-8 shadow-md">
            <h3 className={cn('text-3xl font-normal text-light duration-700 sm:text-5xl', transitionLeft)}>
              ARE YOU AN EMPLOYER...?
            </h3>
            <div className={`flex max-w-2xl flex-col gap-10 text-sm text-light sm:text-lg [&>*]:duration-700`}>
              <p className={transitionLeft}>
                Trust our professional approach and join as an company to our community ! At{' '}
                <span className="font-semibold">RecruITer</span>, we meticulously create symbiotic environments where
                your esteemed organization and adept candidates converge to create innovative future tech landscapes
              </p>
              <p className={transitionLeft}>🎯 Place Your Job Offers - Connecting Employers and Potential Talent</p>
              <p className={transitionLeft}>
                🛠 Add Your Technical and Practical Exercises - Shape the Future Skillset
              </p>
              <p className={transitionLeft}>🔄 Perform Recruitment Process - Streamlining Hiring to its Best</p>
              <p className={transitionLeft}>💼 Process Technical Interview - Uncover True Potential</p>
              <p className={transitionLeft}>👥 Manage Candidates - A Central Hub for All Your Recruitment Needs</p>
              <p className={transitionLeft}>
                And many more... navigate to{' '}
                <Link to={Paths.company.path} className="text-orange underline">
                  Employers Section
                </Link>{' '}
                to see more details
              </p>
            </div>
          </div>
          <img src={BusinessWomanImage} className="relative right-0  hidden max-h-[80vh] xl:block" />
        </div>
      </section>
    </>
  );
};

export default HomePage;
