import LogoIcon from '@/assets/LogoIcon';
import CustomSelect, { Option } from '../UI/CustomSelect';
import { MouseEvent, useRef, useState } from 'react';
import SearchIcon from '@/assets/SearchIcon';
import IconButton from '../UI/IconButton';
import UserIcon from '@/assets/UserIcon';
import FavoriteIcon from '@/assets/favoriteIcon';
import CartIcon from '@/assets/CartIcon';
import BurgerMenuIcon from '@/assets/BurgerMenuIcon';
import { createPortal } from 'react-dom';
import CloseIcon from '@/assets/CloseIcon';
import { useOnClickOutside } from 'usehooks-ts';
import Accordion from '../UI/Accordion';
import CategoriesDropDown from './CategoriesDropDown';
import CategoriesNavBar from './CategorigesNavBar';

const options = ['All categories', 'Smartphone', 'Laptop', 'TV', 'PC'];

const categories = [
  {
    title: options[0],
    items: options.map((opt, idx) => ({ id: idx, title: opt }))
  },
  {
    title: options[1],
    items: options.map((opt, idx) => ({ id: idx, title: opt }))
  },
  {
    title: options[2],
    items: options.map((opt, idx) => ({ id: idx, title: opt }))
  },
  {
    title: options[3],
    items: options.map((opt, idx) => ({ id: idx, title: opt }))
  },
  {
    title: options[1],
    items: options.map((opt, idx) => ({ id: idx, title: opt }))
  }
];

export default function SearchBar() {
  const dropDown = useRef<HTMLDivElement | null>(null);

  const [isSideBar, setIsSideBar] = useState(false);
  const [selected, setSelected] = useState(-1);

  function openDropDown(event: MouseEvent<HTMLDivElement>, idx: number) {
    if (!dropDown.current) return;
    const target = event.currentTarget;
    const categoryRect = target.getBoundingClientRect();
    const dropDownRect = dropDown.current.getBoundingClientRect();

    const position = categoryRect.x + categoryRect.width / 2 - dropDownRect.width / 2;
    setSelected(idx);

    if (position < 0) {
      dropDown.current.style.left = `${0}px`;
      return;
    }
    if (position + dropDownRect.width > window.innerWidth) {
      dropDown.current.style.left = `${window.innerWidth - dropDownRect.width}px`;
      return;
    }

    dropDown.current.style.left = `${position}px`;
  }
  return (
    <div className="relative">
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
            text="$0.00"
            icon={<CartIcon className="text-gray-700" width={24} height={24} />}
          />
        </div>
      </div>
      <CategoriesNavBar
        selected={selected}
        onLeave={() => setSelected(-1)}
        onHover={(e, idx) => openDropDown(e, idx)}
      />
      <div
        ref={dropDown}
        onMouseEnter={() => setSelected(selected)}
        onMouseLeave={() => setSelected(-1)}
        className={
          'absolute transition-all ' +
          (selected !== -1 ? 'visible opacity-100' : 'invisible opacity-0')
        }>
        <CategoriesDropDown categories={categories} />
      </div>
    </div>
  );
}

function Search() {
  const [searchField, setSearchField] = useState<Option>('All categories');
  return (
    <div className="flex w-full max-w-4xl rounded-full ring-2 ring-primary-600">
      <input
        placeholder="Search for products"
        type="text"
        className="flex-auto bg-transparent p-3 px-6	"
      />
      <div className="flex items-center">
        <div className="mr-2 h-[70%] w-0.5 bg-gray-200"></div>
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
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [dropDown, setDropDown] = useState(-1);

  function openDropDown(idx: number) {
    setDropDown(() => (idx === dropDown ? -1 : idx));
  }

  useOnClickOutside(sideBar, () => closeSideBar());
  return (
    <div
      ref={sideBar}
      className={'absolute z-[10000] flex h-full ' + (opened ? 'visible' : 'invisible')}>
      <div
        className={
          'w-72 overflow-auto bg-white pt-14 transition ' +
          (opened ? 'translate-x-0 shadow-2xl' : '-translate-x-full')
        }>
        <div className="flex items-center justify-between px-7">
          <h1 className="text-2xl font-semibold">Welcome!</h1>
          <IconButton onClick={closeSideBar} icon={<CloseIcon width={24} height={24} />} />
        </div>

        <div className="mt-8 flex flex-col">
          {options.map((option, idx) => {
            return (
              <div
                key={idx}
                className="relative border-b border-solid border-gray-200 last:border-none">
                <Accordion
                  isOpened={dropDown === idx}
                  onOpen={() => openDropDown(idx)}
                  title={option}
                  items={options}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
