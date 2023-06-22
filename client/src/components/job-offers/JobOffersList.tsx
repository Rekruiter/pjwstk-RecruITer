import React from "react";

type jobOfferItem = {
  position: string;
  location: string;
  salary: string;
};

const mockedJobOffers: jobOfferItem[] = [
  {
    position: "Junior Frontend Developer",
    location: "Warsaw",
    salary: "5000 PLN",
  },
  {
    position: "Mid C# Developer",
    location: "Remote",
    salary: "8900 PLN",
  },
  {
    position: "Senior Java Developer",
    location: "Cracow",
    salary: "11200 PLN",
  },
];

const headers = ["Position", "Location", "Salary"];

export default function JobOfferList() {
  return (
    <div className="mx-5 flex-1 flex flex-col">
      <div className="flex-1 bg-gray-700 flex flex-col rounded-lg">
        <div className="flex-1 m-5 bg-blue-950 flex rounded-lg flex-col">
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
          <div className="flex flex-col gap-5">
            {mockedJobOffers.map((jobOffer) => (
              <div className="bg-teal-400 flex flex-row justify-evenly mx-5 rounded-lg px-5">
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
          <div className="mx-5 flex flex-row justify-end">
            <button className="w-52 mt-5 bg-teal-600 hover:bg-teal-300 text-white hover:text-gray-900">
              ADD NEW JOB OFFER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
