import { ISupportedTechnology } from '@/types/tasksTypes';
import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import { SetURLSearchParams } from 'react-router-dom';

interface SearchboxProps {
  supportedTechnologies: ISupportedTechnology[] | undefined;
  setSearchParams: SetURLSearchParams;
  search: string | null;
}

const Searchbox = ({ supportedTechnologies, setSearchParams, search }: SearchboxProps) => {
  const searchParam = search ?? '';
  const [searchInput, setSearchInput] = useState(searchParam);

  const hints =
    searchInput.trim() && searchInput !== searchParam
      ? supportedTechnologies?.filter((technology) =>
          technology.name.toLowerCase().includes(searchInput.trim().toLowerCase()),
        )
      : [];

  const handleSearchButton = (searchPhrase?: string) => {
    if (!searchInput.trim() && !searchPhrase) return;
    setSearchParams((prevParams) => {
      prevParams.set('search', searchPhrase ?? searchInput);
      return prevParams;
    });
  };

  useEffect(() => {
    if (searchInput === '   ') {
      setSearchInput(searchParam ?? '');
    }
  }, [searchInput, searchParam]);

  const handleRemoveSearchParam = () => {
    setSearchInput('');
    setSearchParams((prevParams) => {
      prevParams.delete('search');
      return prevParams;
    });
  };

  return (
    <div className="relative flex min-h-[40px] basis-1/3 items-center gap-4 rounded-lg bg-white px-3.5 text-dark">
      <IoIosSearch size={24} />
      <input
        className="h-full w-full text-lg text-dark outline-0"
        type="text"
        value={searchInput}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur();
            if (!searchInput.trim()) {
              handleRemoveSearchParam();
              return;
            }
            handleSearchButton();
          }
        }}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        onBlur={() => setTimeout(() => setSearchInput('   '), 100)}
      />
      {hints && hints.length > 0 && (
        <div className="absolute left-0 top-[50px] z-20 w-full rounded-md bg-dark_blue p-3">
          <div className="max-h-[150px] overflow-auto rounded-md">
            {hints.map((hint) => (
              <button
                onClick={() => {
                  handleSearchButton(hint.name);
                  setSearchInput(hint.name);
                }}
                key={hint.code}
                className="hover: w-full bg-light p-2 text-start text-dark shadow-md hover:bg-orange hover:text-light">
                {hint.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {searchParam && searchParam === searchInput.trim() ? (
        <button onClick={handleRemoveSearchParam}>
          <IoCloseSharp />
        </button>
      ) : (
        <button
          onClick={() => {
            if (!searchInput.trim()) {
              handleRemoveSearchParam();
              return;
            }
            handleSearchButton();
          }}
          className="text-sm text-dark">
          Search
        </button>
      )}
    </div>
  );
};

export default Searchbox;
