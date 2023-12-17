import Button from '@/components/UI/Button';
import BusinessWomanImage from '../../assets/business_woman.png';

const CompanyPage = () => {
  return (
    <section className="container flex w-full flex-col self-center bg-light p-6 md:p-4">
      <div className="flex w-full flex-col gap-12 rounded-md px-5 py-5 pb-24 text-dark lg:px-16">
        <h2 className="mt-5 text-2xl font-bold">For companies</h2>
        <div className="relative flex h-[625px] justify-between text-dark">
          <div className="flex max-h-full flex-col items-start gap-12 rounded-md bg-dark/5 p-8 shadow-lg">
            <h3 className="text-lg font-normal">Are you an employer...?</h3>
            <div className="text-md flex max-w-2xl flex-col gap-10">
              <p>
                Trust our professional approach and join as an company to our community ! At{' '}
                <span className="font-semibold">RecruITer</span>, we meticulously create symbiotic environments where
                your esteemed organization and adept candidates converge to create innovative future tech landscapes
              </p>
              <p>🎯 Place Your Job Offers - Connecting Employers and Potential Talent</p>
              <p>🛠 Add Your Technical and Practical Exercises - Shape the Future Skillset</p>
              <p>🔄 Perform Recruitment Process - Streamlining Hiring to its Best</p>
              <p>💼 Process Technical Interview - Uncover True Potential</p>
              <p>👥 Manage Candidates - A Central Hub for All Your Recruitment Needs</p>
            </div>
            <Button className="w-full md:w-auto">Create company account</Button>
          </div>
          <img src={BusinessWomanImage} className="relative right-0 hidden h-full object-contain xl:block" />
        </div>
      </div>
    </section>
  );
};

export default CompanyPage;
