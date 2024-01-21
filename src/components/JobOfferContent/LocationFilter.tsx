import { PathSearchParams } from '@/constants/paths';
import { useState } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import LocationFilterModal from './LocationFilterModal';
import { IoClose } from 'react-icons/io5';

interface LocationFilterProps {
  pickedLocations: string[];
  isRemote: boolean;
  setSearchParams: SetURLSearchParams;
}

const LocationFilter = ({ pickedLocations, isRemote, setSearchParams }: LocationFilterProps) => {
  const [showLocationFilterModal, setShowLocationFilterModal] = useState(false);

  const handleUpdateLocation = (locations: string[], isRemote: boolean) => {
    setSearchParams((prevParams) => {
      prevParams.set(PathSearchParams.location, JSON.stringify(locations.join(',')));
      prevParams.set(PathSearchParams.isRemote, JSON.stringify(isRemote));
      prevParams.set(PathSearchParams.pageNumber, '1');
      return prevParams;
    });

    setShowLocationFilterModal(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setShowLocationFilterModal(true)}
        className="flex items-center gap-2 place-self-center rounded-full border px-3 py-1 pr-4">
        <CiLocationOn />
        <h5>Location</h5>
      </button>
      <div className="flex gap-2">
        <div className="flex flex-wrap gap-2">
          {pickedLocations.map((location, idx) => (
            <p key={idx} className="text-sm font-semibold text-light_blue">
              {location}
            </p>
          ))}
          {isRemote && <p className="text-sm text-light_blue">Remote</p>}
        </div>
        {(pickedLocations.length !== 0 || isRemote) && (
          <button onClick={() => handleUpdateLocation([], false)} className="text-light_blue">
            <IoClose />
          </button>
        )}
      </div>
      {showLocationFilterModal && (
        <LocationFilterModal
          handleCloseModal={() => setShowLocationFilterModal(false)}
          pickedLocations={pickedLocations}
          pickedIsRemote={isRemote}
          handleUpdateLocation={handleUpdateLocation}
        />
      )}
    </div>
  );
};

export default LocationFilter;
