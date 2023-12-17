import { useSearchParams } from 'react-router-dom';
import RequiredSignUpModal from '@/components/PublicTasksContent/RequiredSignUpModal';
import { useState } from 'react';
import EmptyDisabledTask from '@/components/PublicTasksContent/EmptyDisabledTask';

const PublicTasksInformationPage = () => {
  const [, setSearchParams] = useSearchParams();
  const [infoModalShow, setInfoModalShow] = useState(false);

  const handleOpenLoginModal = (authMethod: 'login' | 'register') => {
    setSearchParams((prevParams) => {
      prevParams.set('authorization', authMethod);
      return prevParams;
    });
  };

  const handleOpenRequiredAuthModal = () => {
    setInfoModalShow(true);
  };

  return (
    <section className="container flex w-full flex-col items-center justify-center p-6 text-dark md:p-4">
      {infoModalShow && (
        <RequiredSignUpModal
          handleCloseModal={() => setInfoModalShow(false)}
          handleOpenRegisterModal={() => handleOpenLoginModal('register')}
        />
      )}
      <div className="flex w-full flex-col gap-12 rounded-md px-5 py-5 pb-24 lg:px-32">
        <h2 className="mt-5 text-2xl font-bold">Tasks section</h2>
        <div className="flex max-w-[40rem] flex-col gap-5 rounded-md p-4 shadow-md">
          <h5 className="text-lg font-semibold">🚀 Dive Into Tailored Tech Tracks</h5>
          <p className="text-md">
            Navigate through our extensive library of theoretical questions, categorized into specific technologies and
            programming languages such as <span className="font-semibold">JavaScript, Python, Java</span>, and many
            more.
          </p>
        </div>
        <div className="flex max-w-[40rem] flex-col gap-5 rounded-md  p-4 shadow-md md:place-self-end">
          <h5 className="text-lg font-semibold">🔍 Real Recruiters’ Question Database</h5>
          <p className="text-md">
            Equip yourself with insights from our robust database of
            <span className="font-semibold"> actual interview questions</span>, pooled from recruiters and experienced
            professionals. Organized by difficulty, question type, and technology.
          </p>
        </div>
        <div className="flex max-w-[40rem] flex-col gap-5 self-start rounded-md p-4 shadow-md">
          <h5 className="text-lg font-semibold">
            🧠 Challenge Your Coding Prowess - <br />
            Practical Programming Problems
          </h5>
          <p className="text-md">
            Embark on an enriching journey through our curated assortment of practical programming problems, devised by
            <span className="font-semibold">seasoned tech interviewers</span> and industry experts
          </p>
        </div>
        <h2 className="mt-5 text-2xl font-bold">Start exploring</h2>
        <div className="flex w-full flex-col gap-2">
          <EmptyDisabledTask
            handleOpenModal={handleOpenRequiredAuthModal}
            question="What is the difference between an interface and an abstract class?"
            starsCount={3}
            technologies={['Java']}
          />
          <EmptyDisabledTask
            handleOpenModal={handleOpenRequiredAuthModal}
            question="What is the difference between a list and a tuple?"
            starsCount={2}
            technologies={['Python']}
          />
          <EmptyDisabledTask
            handleOpenModal={handleOpenRequiredAuthModal}
            question="Regular expressions matching"
            starsCount={5}
            technologies={['Java', 'Typescript', 'Python']}
          />
        </div>
        <p className="text-lg text-dark">
          To access all our features and track your progress, please{' '}
          <span
            className="cursor-pointer font-semibold text-orange underline"
            onClick={() => handleOpenLoginModal('register')}>
            create an account
          </span>{' '}
          or{' '}
          <span
            className="cursor-pointer font-semibold text-orange underline"
            onClick={() => handleOpenLoginModal('register')}>
            log in
          </span>
          .
        </p>
      </div>
    </section>
  );
};

export default PublicTasksInformationPage;
