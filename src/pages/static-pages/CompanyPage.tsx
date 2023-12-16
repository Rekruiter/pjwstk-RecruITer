import Button from '@/components/UI/Button';

const CompanyPage = () => {
  return (
    <section className="min-h-screen-navbar flex w-full flex-col justify-center self-center bg-light">
      <div className="container relative flex flex-col gap-16 px-2">
        <h3 className="text-center text-4xl font-semibold leading-[3.25rem] text-dark">FOR COMPANIES</h3>
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
              <span className="font-semibold"> actual interview questions</span>, pooled from recruiters and experienced
              professionals. Organized by difficulty, question type, and technology.
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
  );
};

export default CompanyPage;
