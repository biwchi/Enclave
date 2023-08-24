import MdiChevronDown from '@/assets/icons/ChevronLightIcon';
import { useRest } from '@/services';
import { Category } from '@/services/products/types';
import { useEffect, useState } from 'react';

export default function ShopPageFilterCategories() {
  const api = useRest();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  async function getCategories() {
    const response = await api.products.getCategories();
    setCategories(response.results);
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="rounded-md bg-gray-100 p-5">
      <h1
        onClick={() => setSelectedCategory(null)}
        className="mb-3.5 cursor-pointer rounded-md p-2.5 font-medium hover:bg-gray-200">
        All categories
      </h1>
      {selectedCategory ? (
        <SubCategories selectedCategory={selectedCategory} />
      ) : (
        <ul>
          {categories.map((category) => {
            return (
              <li
                onClick={() => setSelectedCategory(category)}
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

function SubCategories({ selectedCategory }: { selectedCategory: Category }) {
  const [opened, setOpened] = useState(true);

  return (
    <div>
      <div
        onClick={() => setOpened((v) => (v = !v))}
        className={
          'flex cursor-pointer items-center justify-between pt-3.5 ' +
          (opened && !!selectedCategory.subCategories.length && 'pb-5')
        }>
        <div className="flex gap-1 rounded-md p-2 hover:bg-gray-200">
          <h1>{selectedCategory.title}</h1>
          <span>({selectedCategory.totalProducts})</span>
        </div>
        {!!selectedCategory.subCategories.length && (
          <MdiChevronDown className={'transition ' + (opened ? 'rotate-180' : 'rotate-0')} />
        )}
      </div>

      <div
        className={
          'border-t border-solid border-gray-200 ' +
          (opened && !!selectedCategory.subCategories.length
            ? 'visible pt-3.5 opacity-100'
            : ' invisible h-0 opacity-0')
        }>
        <h1 className="py-3.5 font-medium">Subcategories</h1>
        <ul>
          {selectedCategory.subCategories.map((category) => {
            return (
              <li
                onClick={() => {}}
                className="cursor-pointer rounded-md px-2.5 py-2.5 text-sm text-gray-700 last:pt-2.5 hover:bg-gray-200">
                {category.title} <span>({category.totalProducts})</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
