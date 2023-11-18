import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { defaultStyles } from '../../../constants/defaultStyles';

interface AuthorizedDropdownMenuProps {
  onLogout: () => void;
  name?: string;
}

const AuthorizedDropdownMenu = ({ onLogout, name = 'Your profile' }: AuthorizedDropdownMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className={`${defaultStyles.orangeButton} bg-darken`}>
        {({ open }) =>
          open ? (
            <div className="flex gap-2 items-center">
              {name} <MdArrowDropUp />
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              {name} <MdArrowDropDown />
            </div>
          )
        }
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute mt-2 w-[8.5rem] origin-top divide-y divide-gray-100 rounded-md bg-white ring-1 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item as={'div'} className="flex justify-center ">
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-orange text-white' : 'text-dark'
                  } rounded-md text-sm py-2 hover:scale-105 w-11/12`}>
                  Your profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item as={'div'} className="flex justify-center">
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-orange text-white' : 'text-dark'
                  } rounded-md text-sm py-2 hover:scale-105 w-11/12`}>
                  Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item as={'div'} className="flex justify-center">
              {({ active }) => (
                <button
                  onClick={onLogout}
                  className={`${
                    active ? 'bg-orange text-white' : 'text-dark'
                  } rounded-md text-sm py-2 hover:scale-105 w-11/12`}>
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AuthorizedDropdownMenu;
