import { useNavigate } from "react-router-dom";
import useFetchList from "../../hooks/useFetchList";

// type jobOfferItem = {
//   id: string;
//   position: string;
//   location: string;
//   salary: string;
// };

// const mockedJobOffers: jobOfferItem[] = [
//   {
//     id: "1",
//     position: "Junior Frontend Developer",
//     location: "Warsaw",
//     salary: "5000 PLN",
//   },
//   {
//     id: "2",
//     position: "Mid C# Developer",
//     location: "Remote",
//     salary: "8900 PLN",
//   },
//   {
//     id: "3",
//     position: "Senior Java Developer",
//     location: "Cracow",
//     salary: "11200 PLN",
//   },
// ];

interface JobOfferPreview {
  id: number;
  idCompany: number;
  salary: number;
  description: string;
}

const headers = ["Position", "Location", "Salary"];

export default function JobOfferList() {
  const {
    list: offers,
    error,
    isLoading,
  } = useFetchList<JobOfferPreview>(
    "https://recruiter-endpoints.azurewebsites.net/api/jobOffers"
  );

  let content;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const navigate = useNavigate();

  return (
    <div className="mx-5 flex-1">
      <div className="bg-gray-700 rounded-lg flex flex-col">
        <div className="m-5 bg-blue-950 rounded-lg flex flex-col">
          <div className="m-5 bg-teal-600 p-5 rounded-lg flex flex-col gap-5 pr-44">
            <h2 className="text-xl font-bold text-black text-">
              User's company name
            </h2>
            <div className="flex flex-row justify-evenly">
              {headers.map((header, index) => (
                <p
                  key={index}
                  className="text-lg font-semibold text-black text-center w-56">
                  {header}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 overflow-auto mx-5">
            {content}
            {offers.map((jobOffer) => (
              <div
                className="bg-teal-500 flex flex-row justify-evenly rounded-lg px-5"
                onClick={() => navigate(`/job-offers/${jobOffer.id}`)}
                key={jobOffer.id}>
                <p className="text-lg font-semibold text-black w-56 text-start">
                  {jobOffer.description}
                </p>
                <p className="text-lg font-semibold text-black w-56 text-center">
                  Warsaw
                </p>
                <p className="text-lg font-semibold text-black w-56 text-center">
                  {jobOffer.salary}
                </p>
                <button
                  className="text-sm bg-teal-700"
                  onClick={async (event) => {
                    event.stopPropagation();
                    await fetch(
                      `https://recruiter-endpoints.azurewebsites.net/api/jobOffers/${jobOffer.id}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    navigate(0);
                  }}>
                  delete
                </button>
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
