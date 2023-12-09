import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { defaultStyles } from '../../../constants/defaultStyles';
import emptyAvatar from '../../../assets/empty_avatar.svg';
import { Avatar, AvatarFallback, AvatarImage } from '../../UI/Avatar';

interface AuthorizedDropdownMenuProps {
  onLogout: () => void;
  name?: string;
}

const AuthorizedDropdownMenu = ({ onLogout, name }: AuthorizedDropdownMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className={`${defaultStyles.orangeButton} bg-darken max-w-[20rem]`}>
        {({ open }) => (
          <div className="flex items-center gap-2">
            <p className="break-all">{name}</p>
            <div>{open ? <MdArrowDropUp size={20} /> : <MdArrowDropDown size={20} />}</div>
            <Avatar>
              <AvatarImage src={emptyAvatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 mt-2 w-full origin-top divide-y divide-gray-100 rounded-md bg-white ring-1 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item as={'div'} className="flex justify-center ">
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-orange text-white' : 'text-dark'
                  } w-11/12 rounded-md py-2 text-sm hover:scale-105`}>
                  Your profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item as={'div'} className="flex justify-center">
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-orange text-white' : 'text-dark'
                  } w-11/12 rounded-md py-2 text-sm hover:scale-105`}>
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
                  } w-11/12 rounded-md py-2 text-sm hover:scale-105`}>
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
