import { useParams } from 'react-router-dom';

export default function JobOfferPreview() {
  const { id } = useParams();
  return (
    <div className="mx-5 flex-1">
      <div className="bg-gray-700 rounded-lg flex flex-col">
        <div className="m-5 bg-blue-950 rounded-lg flex flex-col">
          There are going to be Applications for job offer with id : {id}
        </div>
      </div>
    </div>
  );
}
