import { Category } from '@/services/products/types';
import { useShopStore } from '@/store/shopStore';
import { Link } from 'react-router-dom';

type CategoriesDropDownProps = {
  category: Category;
};

export default function CategoriesDropDown({ category }: CategoriesDropDownProps) {
  const { setFilters } = useShopStore();


  return (
    <div className="rounded-lg bg-white p-5 shadow-md">
      <h1 className="mb-3 px-3 text-lg font-medium">{category.title}</h1>
      {category.subCategories.map((subCategory, idx) => {
        return (
          <div key={idx} className="flex flex-col gap-4">
            <Link
              onClick={() => setFilters({ category: category.id, subCategory: subCategory.id })}
              key={idx}
              className=" rounded-md px-3 py-3 text-gray-700 hover:bg-gray-100 "
              to={'/shop'}>
              {subCategory.title}
            </Link>
          </div>
        );
      })}
      <div></div>
    </div>
  );
}
