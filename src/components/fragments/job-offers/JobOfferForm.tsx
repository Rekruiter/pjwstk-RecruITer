import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface QuestionForm {
  question: string;
}

const validationSchema = Yup.object().shape({
  jobName: Yup.string().required('Job Name is required'),
  requirements: Yup.string().required('Requirements are required'),
  salary: Yup.number().required('Salary is required'),
});

export default function JobOfferForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [questions, setQuestions] = useState<QuestionForm[]>([]);

  const formik = useFormik({
    initialValues: {
      jobName: '',
      requirements: '',
      salary: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          IdCompany: '1',
          Salary: values.salary,
          Description: values.jobName,
          Requirements: values.requirements,
          DateExpires: '2023-07-25T10:00:00',
        }),
      });

      if (response.status === 201) {
        resetForm();
        navigate('/job-offers');
      } else {
        setError('Something went wrong : ' + response.status + ' ' + response.statusText);
      }
    },
  });

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = { question: value };
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '' }]);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  return (
    <div className="mx-5 flex-1">
      <div className="bg-gray-700 rounded-lg flex flex-col">
        <div className="m-5 bg-blue-950 rounded-lg flex flex-col justify-center items-center">
          <form onSubmit={formik.handleSubmit} className="bg-teal-800 rounded-lg m-5">
            <div>
              <div className="m-5 flex justify-between gap-5">
                <label htmlFor="jobName">Job Offer Name:</label>
                <input
                  className="bg-white rounded-lg text-black"
                  type="text"
                  id="jobName"
                  value={formik.values.jobName}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors.jobName && formik.touched.jobName && (
                <div className="text-center text-red-600 font-bold">{formik.errors.jobName}</div>
              )}
            </div>

            <div>
              <div className="m-5 flex justify-between gap-5">
                <label htmlFor="location">Requirments:</label>
                <input
                  className="bg-white rounded-lg text-black"
                  type="text"
                  id="requirements"
                  value={formik.values.requirements}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors.requirements && formik.touched.requirements && (
                <div className="text-center text-red-600 font-bold">
                  {formik.errors.requirements}
                </div>
              )}
            </div>

            <div>
              <div className="m-5 flex justify-between gap-5">
                <label htmlFor="salary">Salary:</label>
                <input
                  className="bg-white rounded-lg text-black"
                  type="number"
                  id="salary"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors.salary && formik.touched.salary && (
                <div className="text-center text-red-600 font-bold">{formik.errors.salary}</div>
              )}
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
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
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
            {error}
            <div className="text-center">
              <button className="rounded-lg shadow-lg bg-teal-300 m-5 text-black" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
