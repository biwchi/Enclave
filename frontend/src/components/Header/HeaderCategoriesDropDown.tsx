import { Category } from '@/services/products/types';
import { Link } from 'react-router-dom';

type CategoriesDropDownProps = {
  categories: Category[];
};

export default function CategoriesDropDown({ categories }: CategoriesDropDownProps) {
  return (
    <div className="grid grid-flow-col grid-rows-2 gap-14 rounded-md bg-white p-5 shadow-md">
      {categories.map((category, idx) => (
        <div key={idx} className="flex w-44 flex-col gap-4">
          <h1 className="px-3 text-lg font-medium">{category.title}</h1>
          <div className="flex flex-col">
            {category.subCategories.map((subCategory, idx) => {
              return (
                <Link key={idx} className=" px-3 py-3 text-gray-700 hover:bg-gray-100 " to={'/'}>
                  {subCategory.title}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      <div></div>
    </div>
  );
}
