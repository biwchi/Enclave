import { Link } from 'react-router-dom';

export type category = {
  id: string | number;
  title: string;
};

type CategoriesDropDownProps = {
  categories: {
    title: string;
    items: category[];
  }[];
};

export default function CategoriesDropDown({ categories }: CategoriesDropDownProps) {
  return (
    <div className="grid grid-rows-2 grid-flow-col gap-14 bg-white p-5 rounded-md shadow-md">
      {categories.map((category, idx) => (
        <div key={idx} className="flex flex-col gap-4 w-44">
          <h1 className="text-lg font-medium px-3">{category.title}</h1>
          <div className="flex flex-col">
            {category.items.map((item, idx) => {
              return (
                <Link key={idx} className=" text-gray-700 py-3 px-3 hover:bg-gray-100 " to={'/'}>
                  {item.title}
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
