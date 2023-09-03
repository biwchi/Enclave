import LogoIcon from '@/assets/icons/LogoIcon';
import CustomSelect from '../UI/CustomSelect';
import SearchIcon from '@/assets/icons/SearchIcon';
import IconButton from '../UI/IconButton';
import UserIcon from '@/assets/icons/UserIcon';
import FavoriteIcon from '@/assets/icons/favoriteIcon';
import CartIcon from '@/assets/icons/CartIcon';
import CategoriesDropDown from './HeaderCategoriesDropDown';
import CategoriesNavBar from './HeaderCategorigesNavBar';
import Modal from '../Modal';
import AuthModal from '../Auth/AuthModal';

import { MouseEvent, useRef, useState } from 'react';
import { useShopStore } from '@/store/shopStore';
import { Category } from '@/services/products/types';
import CustomButton from '../UI/CustomButton';
import { useLocalStorage } from 'usehooks-ts';
import { useAuthStore } from '@/store/authStore';
import SignOutIcon from '@/assets/icons/SignOutIcon';
import { Link } from 'react-router-dom';

export default function SearchBar() {
  const dropDown = useRef<HTMLDivElement | null>(null);

  const { categories } = useShopStore();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();

  const [selected, setSelected] = useState(-1);
  const [authModal, setAuthModal] = useState(false);
  const [_accessToken, setAccessToken] = useLocalStorage('access_token', '');

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
      dropDown.current.style.left = `${window.innerWidth - dropDownRect.width - 20}px`;
      return;
    }

    dropDown.current.style.left = `${position}px`;
  }
  return (
    <div className="relative">
      <div className="m-auto flex max-w-[1400px] items-center justify-between py-5">
        <div>
          <Link to="/">
            <LogoIcon />
          </Link>
        </div>
        <Search />
        {isLoggedIn ? (
          <div className="flex gap-8">
            <IconButton
              title="My profile"
              icon={<UserIcon className="text-gray-700" width={24} height={24} />}
            />
            <Link to="wishlist">
              <IconButton
                title="Wishlist"
                icon={<FavoriteIcon className="text-gray-700" width={24} height={24} />}
              />
            </Link>
            <IconButton
              title="My cart"
              text="$0.00"
              icon={<CartIcon className="text-gray-700" width={24} height={24} />}
            />
            <IconButton
              onClick={() => {
                setIsLoggedIn(false);
                setAccessToken('');
              }}
              title="Login out"
              icon={<SignOutIcon className="text-gray-700" width={24} height={24} />}
            />
          </div>
        ) : (
          <div>
            <CustomButton onClick={() => setAuthModal(true)} text="Sign up" />
          </div>
        )}
      </div>
      <Modal
        modalTitle="Create account"
        opened={authModal}
        closeModal={() => setAuthModal(false)}
        modalContent={<AuthModal />}
      />
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
          'absolute z-[1000] transition-all ' +
          (selected !== -1 ? 'visible opacity-100' : 'invisible opacity-0')
        }>
        <CategoriesDropDown categories={categories} />
      </div>
    </div>
  );
}

function Search() {
  const { categories } = useShopStore();
  const [searchCategory, setSearchCategory] = useState<Category | undefined>(undefined);
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
          selected={searchCategory}
          placeholder="All categories"
          options={categories}
          onSelect={(opt) => setSearchCategory(opt)}
        />
      </div>
      <div className="aspect-square h-[3.1rem]">
        <button className="flex h-full w-full items-center justify-center rounded-br-full rounded-tr-full bg-primary-600 transition hover:bg-primary-700">
          <SearchIcon className="text-white" height={20} width={20} />
        </button>
      </div>
    </div>
  );
}
