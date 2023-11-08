import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { defaultStyles } from '../../../constants/defaultStyles';

interface LoginDropdownMenuProps {
  onLogout: () => void;
}

const LoginDropdownMenu = ({ onLogout }: LoginDropdownMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={`${defaultStyles.orangeButton} flex gap-2 items-center  justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}>
        Marcin
        <MdArrowDropDown />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                  {active ? <div> seima</div> : <div> siema2</div>}
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              <div>siema</div>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <div>siema</div>
            </Menu.Item>
            <Menu.Item>
              <div>siema</div>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <div>siema</div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LoginDropdownMenu;
