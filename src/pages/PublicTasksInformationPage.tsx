import { useSearchParams } from 'react-router-dom';
import Button from '../components/UI/Button';
import { FaStar } from 'react-icons/fa';

const PublicTasksInformationPage = () => {
  const [, setSearchParams] = useSearchParams();

  const handleOpenLoginModal = () => {
    setSearchParams((prevParams) => {
      prevParams.set('authorization', 'register');
      return prevParams;
    });
  };

  return (
    <section className="min-h-screen-navbar flex w-full flex-col items-center gap-32 bg-light p-2 text-dark md:p-0">
      <h2 className="mx-auto mt-5 text-3xl">Tasks section</h2>
      <div className="flex w-full max-w-[40rem] flex-col">
        <div className="group flex cursor-pointer flex-col gap-2 border p-1 hover:scale-105 hover:bg-orange/70 hover:text-light/70">
          <p className="font-semibold">What is the difference between an interface and an abstract class?</p>
          <div className="flex justify-between">
            <div>
              <p>Java</p>
            </div>
            <div className="inline-flex text-orange group-hover:text-light/70">
              {Array(3)
                .fill(0)
                .map(() => (
                  <FaStar />
                ))}
            </div>
          </div>
        </div>
        <div className="group flex cursor-pointer flex-col gap-2 border p-1 hover:scale-105 hover:bg-orange/70 hover:text-light/70">
          <p className="font-semibold">Regular expressions matching</p>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <p>Java</p>
              <p>Typescript</p>
              <p>Python</p>
            </div>
            <div className="inline-flex text-orange group-hover:text-gray-600/70">
              {Array(5)
                .fill(0)
                .map(() => (
                  <FaStar />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-w-[40rem] flex-col gap-5">
        <h5 className="text-xl font-semibold">🚀 Dive Into Tailored Tech Tracks</h5>
        <p className="text-lg">
          Navigate through our extensive library of theoretical questions, categorized into specific technologies and
          programming languages such as <span className="font-semibold">JavaScript, Python, Java</span>, and many more.
        </p>
      </div>
      <p className="text-md">To access all our features and track your progress, please create an account or log in.</p>
      <div className="flex justify-center gap-10">
        <Button onClick={handleOpenLoginModal}>Sing Up</Button>
      </div>
    </section>
  );
};

export default PublicTasksInformationPage;
