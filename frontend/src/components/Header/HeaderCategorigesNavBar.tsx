import ChevronIcon from '@/assets/icons/ChevronIcon';
import { useCategiesContext } from '@/contexts/categoriesContext';
import { useShopStore } from '@/store/shopStore';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

type CategoriesNavBarProps = {
  selected: number;
  hide: boolean;
  onHover: (event: MouseEvent<HTMLDivElement>, idx: number) => void;
  onLeave: () => void;
};

export default function CategoriesNavBar({
  selected,
  hide,
  onHover,
  onLeave
}: CategoriesNavBarProps) {
  const { setFilters } = useShopStore();
  const categories = useCategiesContext()

  return (
    <div className="m-auto flex justify-center bg-primary-600">
      <div className="flex w-full max-w-[1400px] items-center justify-evenly">
        {categories.map((category, idx) => {
          return (
            <Link key={idx} onClick={() => setFilters({ category: category.id })} to={'/shop'}>
              <div
                onMouseEnter={(e) => onHover(e, idx)}
                onMouseLeave={onLeave}
                className="flex w-full cursor-pointer items-center justify-center gap-2 border-r border-solid border-primary-800 py-3 font-medium text-white last:border-none ">
                <p>{category.title}</p>
                {category.subCategories[0].id !== null && (
                  <ChevronIcon color="#ffffff" rotate={selected !== idx || !hide} />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
