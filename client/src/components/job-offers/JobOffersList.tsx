import { useNavigate } from "react-router-dom";

type jobOfferItem = {
  id: string;
  position: string;
  location: string;
  salary: string;
};

const mockedJobOffers: jobOfferItem[] = [
  {
    id: "1",
    position: "Junior Frontend Developer",
    location: "Warsaw",
    salary: "5000 PLN",
  },
  {
    id: "2",
    position: "Mid C# Developer",
    location: "Remote",
    salary: "8900 PLN",
  },
  {
    id: "3",
    position: "Senior Java Developer",
    location: "Cracow",
    salary: "11200 PLN",
  },
];

const headers = ["Position", "Location", "Salary"];

export default function JobOfferList() {
  const navigate = useNavigate();

  return (
    <div className="mx-5 flex-1">
      <div className="bg-gray-700 rounded-lg flex flex-col">
        <div className="m-5 bg-blue-950 rounded-lg flex flex-col">
          <div className="m-5 bg-teal-600 p-5 rounded-lg flex flex-col gap-5">
            <h2 className="text-xl font-bold text-black text-">
              User's company name
            </h2>
            <div className="flex flex-row justify-evenly">
              {headers.map((header) => (
                <p className="text-lg font-semibold text-black text-center w-56">
                  {header}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 overflow-auto mx-5">
            {mockedJobOffers.map((jobOffer) => (
              <div
                className="bg-teal-400 flex flex-row justify-evenly rounded-lg px-5"
                onClick={() => navigate(`/job-offers/${jobOffer.id}`)}
                key={jobOffer.id}>
                <p className="text-lg font-semibold text-black w-56 text-start">
                  {jobOffer.position}
                </p>
                <p className="text-lg font-semibold text-black w-56 text-center">
                  {jobOffer.location}
                </p>
                <p className="text-lg font-semibold text-black w-56 text-center">
                  {jobOffer.salary}
                </p>
                {/* Make here this div scrollable and leave button always seen */}
              </div>
            ))}
          </div>
          <div className="m-5 flex flex-row justify-end">
            <button
              className="w-52 mt-5 bg-teal-600 hover:bg-teal-300 text-white hover:text-gray-900"
              onClick={() => navigate("/job-offers/new")}>
              ADD NEW JOB OFFER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
