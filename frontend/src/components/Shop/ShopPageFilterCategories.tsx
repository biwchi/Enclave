import MdiChevronDown from '@/assets/ChevronLightIcon';

type ShopPageFilterCategoriesProps = {
  selectedCategory?: string;
};

const options = ['All categories', 'Smartphone', 'Laptop', 'TV', 'PC'];

export default function ShopPageFilterCategories({
  selectedCategory
}: ShopPageFilterCategoriesProps) {
  return (
    <div className="rounded-md bg-gray-100 p-5">
      <h1 className="mb-2.5 font-medium">Categories</h1>
      <ul>
        {options.map((category) => {
          return <li className="py-2.5 last:pt-2.5">{category}</li>;
        })}
      </ul>
    </div>
  );
}

function SubCategories({ selectedCategory }: { selectedCategory: string }) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-solid border-gray-100 pb-5">
        <div>
          <h1>{selectedCategory}</h1> <span>(1125)</span>
        </div>
        <MdiChevronDown />
      </div>

      <div className="mt-5">
        <h1>Subcategories</h1>
        <ul>
          {options.map((category) => {
            return <li>{category}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
