import { Category, SubCategory } from '@/services/products/types';
import { useShopStore } from '@/store/shopStore';

export default function ShopPageFilterCategories() {
  const { categories, filters, setFilters } = useShopStore();

  return (
    <div className="rounded-md bg-gray-100 p-5">
      <h1
        onClick={() => setFilters({ category: undefined, subCategory: undefined })}
        className={
          'mb-3.5 cursor-pointer rounded-md p-2.5 font-medium ' +
          (filters.category === undefined ? 'bg-gray-200' : 'hover:bg-gray-200')
        }>
        All categories
      </h1>
      {filters.category ? (
        <SubCategories
          selectSub={(category) => setFilters({ subCategory: category ? category.id : undefined })}
          selectedSub={filters.subCategory}
          selectedCategory={categories.find((category) => category.id === filters.category)}
        />
      ) : (
        <ul>
          {categories.map((category, idx) => {
            return (
              <li
                key={idx}
                onClick={() => setFilters({ category: category.id })}
                className="cursor-pointer rounded-md px-2.5 py-2.5 text-sm text-gray-700 last:pt-2.5  hover:bg-gray-200">
                {category.title} <span>({category.totalProducts})</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function SubCategories({
  selectedCategory,
  selectedSub,
  selectSub
}: {
  selectedCategory: Category | undefined;
  selectedSub?: number;
  selectSub: (subCategory: SubCategory | undefined) => void;
}) {
  if (selectedCategory) {
    return (
      <div>
        <div
          className={
            'mt-3.5 flex cursor-pointer items-center justify-between rounded-md bg-gray-200 p-1 pr-3 ' +
            (!!selectedCategory.subCategories.length &&
              selectedCategory.subCategories[0].id &&
              'mb-5')
          }>
          <div className="flex gap-1 p-2" onClick={() => selectSub(undefined)}>
            <h1>{selectedCategory.title}</h1>
            <span>({selectedCategory.totalProducts})</span>
          </div>
        </div>

        <div
          className={
            'border-t border-solid border-gray-200 ' +
            (!!selectedCategory.subCategories.length && selectedCategory.subCategories[0].id
              ? 'visible pt-3.5 opacity-100'
              : ' invisible h-0 opacity-0')
          }>
          <h1 className="py-3.5 pl-2 font-medium">Subcategories</h1>
          <ul>
            {selectedCategory.subCategories.map((category, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => selectSub(category.id === selectedSub ? undefined : category)}
                  className={
                    'cursor-pointer rounded-md px-2.5 py-2.5 text-sm text-gray-700 last:pt-2.5 ' +
                    (category.id === selectedSub ? 'bg-gray-200 font-medium' : 'hover:bg-gray-200')
                  }>
                  {category.title} <span>({category.totalProducts})</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
