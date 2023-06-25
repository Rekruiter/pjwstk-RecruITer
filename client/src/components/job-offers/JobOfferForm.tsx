import React, { FormEvent, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

interface QuestionForm {
  question: string;
}

export default function JobOfferForm() {
  const navigate = useNavigate();
  const [jobName, setJobName] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [questions, setQuestions] = useState<QuestionForm[]>([]);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = { question: value };
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "" }]);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Form submission logic goes here
    // You can access the form data like jobName, location, salary, and questions

    // Reset form fields after submission
    setJobName("");
    setLocation("");
    setSalary("");
    setQuestions([]);
    navigate("/job-offers");
  };

  return (
    <div className="mx-5 flex-1">
      <div className="bg-gray-700 rounded-lg flex flex-col">
        <div className="m-5 bg-blue-950 rounded-lg flex flex-col justify-center items-center">
          <form onSubmit={handleSubmit} className="bg-teal-800 m-5">
            <div className="m-5 flex justify-between gap-5">
              <label htmlFor="jobName">Job Offer Name:</label>
              <input
                className="bg-white rounded-lg text-black"
                type="text"
                id="jobName"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
              />
            </div>

            <div className="m-5 flex justify-between gap-5">
              <label htmlFor="location">Location:</label>
              <input
                className="bg-white rounded-lg text-black"
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="m-5 flex justify-between gap-5">
              <label htmlFor="salary">Salary:</label>
              <input
                className="bg-white rounded-lg text-black"
                type="text"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <div className="m-5 flex flex-col justify-between gap-5">
              <h3>Questions:</h3>
              {questions.map((question, index) => (
                <div key={index} className="flex flex-row">
                  <input
                    className="bg-white rounded-lg text-black"
                    type="text"
                    id={`question-${index}`}
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="ml-4 bg-red text-white border-none p-1"
                    onClick={() => handleRemoveQuestion(index)}>
                    delete
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddQuestion}>
                Add Question
              </button>
            </div>
            <div className="text-center">
              <button
                className="rounded-lg shadow-lg bg-teal-300 m-5 text-black"
                type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
