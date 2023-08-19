import LogoIcon from '@/assets/LogoIcon';
import CustomSelect, { Option } from './UI/CustomSelect';
import { useRef, useState } from 'react';
import SearchIcon from '@/assets/SearchIcon';
import IconButton from './UI/IconButton';
import UserIcon from '@/assets/UserIcon';
import FavoriteIcon from '@/assets/favoriteIcon';
import CartIcon from '@/assets/CartIcon';
import BurgerMenuIcon from '@/assets/BurgerMenuIcon';
import { createPortal } from 'react-dom';
import CloseIcon from '@/assets/CloseIcon';
import { useOnClickOutside } from 'usehooks-ts';
import Accordion from './UI/Accordion';

export default function SearchBar() {
  const [isSideBar, setIsSideBar] = useState(false);

  return (
    <div className="m-auto flex max-w-[1400px] items-center justify-between py-5">
      <div className="flex items-center gap-6">
        <IconButton
          onClick={() => setIsSideBar(true)}
          className="mt-2"
          icon={<BurgerMenuIcon width={24} height={24} />}
        />
        {createPortal(
          <SideBarMenu opened={isSideBar} closeSideBar={() => setIsSideBar(false)} />,
          document.getElementById('root')!
        )}
        <LogoIcon />
      </div>
      <Search />
      <div className="flex gap-8">
        <IconButton
          title="My profile"
          icon={<UserIcon className="text-gray-700" width={24} height={24} />}
        />
        <IconButton
          title="Wishlist"
          icon={<FavoriteIcon className="text-gray-700" width={24} height={24} />}
        />
        <IconButton
          title="My cart"
          icon={<CartIcon className="text-gray-700" width={24} height={24} />}
        />
      </div>
    </div>
  );
}

const options = ['All categories', 'Smartphone', 'Laptop', 'TV', 'PC'];

function Search() {
  const [searchField, setSearchField] = useState<Option>('All categories');
  return (
    <div className="flex w-full max-w-4xl rounded-full ring-2 ring-primary-600">
      <input
        placeholder="Search for products"
        type="text"
        className="bg-transparent flex-auto p-3 px-6	"
      />
      <div className="flex items-center">
        <div className="bg-gray-200 mr-2 h-[70%] w-0.5"></div>
        <CustomSelect
          selected={searchField}
          placeholder="All categories"
          options={options}
          rouneded
          onSelect={(opt) => setSearchField(opt)}
        />
      </div>
      <div className="aspect-square h-12">
        <button className="flex h-full w-full items-center justify-center rounded-br-full rounded-tr-full bg-primary-600 transition hover:bg-primary-700">
          <SearchIcon className="text-white" height={20} width={20} />
        </button>
      </div>
    </div>
  );
}

type SideBarMenuProps = {
  opened: boolean;
  closeSideBar: () => void;
};

function SideBarMenu({ opened, closeSideBar }: SideBarMenuProps) {
  const sideBar = useRef(null);

  useOnClickOutside(sideBar, () => closeSideBar());
  return (
    <div
      ref={sideBar}
      className={
        'absolute z-[10000] h-full w-72 pt-14 transition overflow-auto ' +
        (opened ? 'translate-x-0 shadow-2xl' : '-translate-x-full')
      }>
      <div className="flex items-center  justify-between px-7">
        <h1 className="text-2xl font-semibold">Welcome!</h1>
        <IconButton onClick={closeSideBar} icon={<CloseIcon width={24} height={24} />} />
      </div>

      <div className="mt-8 px-5">
        {options.map((option) => {
          return (
            <div className='my-2'>
              <Accordion title={option} items={options} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
