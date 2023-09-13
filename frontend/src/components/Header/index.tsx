import LogoIcon from '@/assets/icons/LogoIcon';
import SignOutIcon from '@/assets/icons/SignOutIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import UserIcon from '@/assets/icons/UserIcon';
import FavoriteIcon from '@/assets/icons/favoriteIcon';
import CartIcon from '@/assets/icons/CartIcon';

import BaseSelect from '../BaseComponents/BaseSelect';
import BaseButton from '../BaseComponents/BaseButton';
import BaseIconButton from '../BaseComponents/BaseIconButton';

import CategoriesDropDown from './HeaderCategoriesDropDown';
import CategoriesNavBar from './HeaderCategorigesNavBar';
import Modal from '../Modals/Modal';
import AuthModal from '../Auth/AuthModal';

import { MouseEvent, useRef, useState } from 'react';
import { Category } from '@/services/products/types';
import { useLocalStorage } from 'usehooks-ts';
import { useAuthStore } from '@/store/authStore';
import { Link } from 'react-router-dom';
import { useCategiesContext } from '@/contexts/categoriesContext';

export default function SearchBar() {
  const dropDown = useRef<HTMLDivElement | null>(null);
  const categories = useCategiesContext();

  const { isLoggedIn, setIsLoggedIn } = useAuthStore();

  const [authModal, setAuthModal] = useState(false);
  const [_accessToken, setAccessToken] = useLocalStorage('access_token', '');
  const [selected, setSelected] = useState({
    id: 0,
    show: false
  });

  function openDropDown(event: MouseEvent<HTMLDivElement>, idx: number) {
    const hasSubCategories = !categories[idx].subCategories[0].id;

    if (!dropDown.current) return;
    if (hasSubCategories) return;

    const target = event.currentTarget;
    const categoryRect = target.getBoundingClientRect();
    const dropDownRect = dropDown.current.getBoundingClientRect();
    const position = categoryRect.x + categoryRect.width / 2 - dropDownRect.width / 2;

    setSelected({ id: idx, show: true });

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
            <BaseIconButton
              title="My profile"
              icon={<UserIcon className="text-gray-700" width={24} height={24} />}
            />
            <Link to="wishlist">
              <BaseIconButton
                title="Wishlist"
                icon={<FavoriteIcon className="text-gray-700" width={24} height={24} />}
              />
            </Link>
            <BaseIconButton
              title="My cart"
              text="$0.00"
              icon={<CartIcon className="text-gray-700" width={24} height={24} />}
            />
            <BaseIconButton
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
            <BaseButton onClick={() => setAuthModal(true)} text="Sign up" />
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
        hide={selected.show}
        selected={selected.id}
        onLeave={() => setSelected({ ...selected, show: false })}
        onHover={(e, idx) => openDropDown(e, idx)}
      />
      <div
        ref={dropDown}
        onMouseEnter={() => setSelected(selected)}
        onMouseLeave={() => setSelected({ ...selected, show: false })}
        className={
          'absolute z-[1000] transition-all ' +
          (selected.show ? 'visible opacity-100' : 'invisible opacity-0')
        }>
        {categories[selected.id] && <CategoriesDropDown category={categories[selected.id]} />}
      </div>
    </div>
  );
}

function Search() {
  const categories = useCategiesContext();
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
        <BaseSelect
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
