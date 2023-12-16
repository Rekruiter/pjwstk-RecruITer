import { IPersonalDataForm } from '../../types/personalDataFormTypes';
import { useSearchParams } from 'react-router-dom';
import { safeJSONParse } from '../../helpers';

type Test = IPersonalDataForm['technologies'][number];

const fields: Omit<Test, 'isPicked'>[] = [
  {
    code: BigInt(1),
    name: 'React',
  },
  {
    code: BigInt(1),
    name: 'Javascript',
  },
  {
    code: BigInt(1),
    name: 'Node',
  },
  {
    code: BigInt(1),
    name: 'Vite',
  },
];

const TasksListPage = () => {
  // const [isOpenedModal, setIsOpenedModal] = useState(false);

  const [searchParams, SetSearchParams] = useSearchParams();

  const pickedTechnologies: string = safeJSONParse(searchParams.get('technologies'));

  const technologies: string[] = pickedTechnologies ? pickedTechnologies.toLowerCase().split(',') : [];

  const allFields: IPersonalDataForm['technologies'] = fields.map((field) => {
    return {
      ...field,
      isPicked: technologies.includes(field.name.toLowerCase()),
    };
  });

  const pickedFields = allFields.filter((field) => field.isPicked);

  const handleUpdatePickedTechnologies = () => {
    const pickedTechnologies = ['React', 'Angular', 'Vue', 'Node'];

    const pickedTechnologiesString = pickedTechnologies.join(',');

    SetSearchParams((prevParams) => {
      prevParams.set('technologies', JSON.stringify(pickedTechnologiesString));
      return prevParams;
    });
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-24 w-full bg-dark_blue text-center text-light shadow-xl">
        <h4 className="mt-4 text-xl">Prepare yourself for every recruitment</h4>
        <div className="container mb-2 flex p-6 md:px-20 lg:px-32">
          <div className="flex w-1/2 items-center gap-2">
            <p>Technologies: </p>
            <div className="flex flex-wrap gap-2">
              {pickedFields.map((field) => (
                <p key={field.name} className="border p-1">
                  {field.name}
                </p>
              ))}
            </div>
            {/* {isOpenedModal && (
              <TechnologiesModal
                fields={fields}
                handleCloseModal={handleCloseModal}
                handlePickTechnology={handlePickTechnology}
              />
            )} */}
            <button onClick={handleUpdatePickedTechnologies}>click me</button>
          </div>
        </div>
      </div>
      <div className="container rounded-b-xl p-8 md:px-12 lg:px-16">
        <h3 className="mb-4 text-lg font-semibold text-dark">Job offers</h3>
        <h4 className="mb-4 text-base font-semibold text-dark"></h4>
      </div>
    </div>
  );
};

export default TasksListPage;
