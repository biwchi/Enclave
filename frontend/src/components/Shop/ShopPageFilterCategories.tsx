import MdiChevronDown from '@/assets/ChevronLightIcon';
import { useState } from 'react';

type ShopPageFilterCategoriesProps = {
  selectedCategory?: string;
};

const options = [
  { title: 'Phones & Gadgets', subCategories: ['Smartphone', 'Phone', 'Smart watch'] },
  { title: 'PC', subCategories: ['Components', 'Motitor', 'Mouse'] },
  { title: 'TV & Audio', subCategories: ['Audio', 'TV'] },
  { title: 'Laptop', subCategories: ['Laptop', 'Bebra', 'Smart watch'] }
];

export default function ShopPageFilterCategories() {
  const [selectedCategory, setSelectedCategory] = useState<{
    title: string;
    subCategories: string[];
  } | null>(null);

  return (
    <div className="rounded-md bg-gray-100 p-5">
      <h1 onClick={() => setSelectedCategory(null)} className="mb-3.5 cursor-pointer font-medium">
        All categories
      </h1>
      {selectedCategory ? (
        <SubCategories selectedCategory={selectedCategory} />
      ) : (
        <ul>
          {options.map((category) => {
            return (
              <li
                onClick={() => setSelectedCategory(category)}
                className="cursor-pointer py-2.5 text-gray-700 last:pt-2.5">
                {category.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function SubCategories({
  selectedCategory
}: {
  selectedCategory: { title: string; subCategories: string[] };
}) {
  const [opened, setOpened] = useState(true);

  return (
    <div>
      <div
        onClick={() => setOpened((v) => (v = !v))}
        className="flex cursor-pointer items-center justify-between pt-3.5 pb-5">
        <div className="flex gap-1">
          <h1>{selectedCategory.title}</h1>
          <span>(1125)</span>
        </div>
        <MdiChevronDown className={'transition ' + (opened ? 'rotate-180' : 'rotate-0')} />
      </div>

      <div
        className={
          'border-t border-solid border-gray-200 pt-3.5 transition-all ' +
          (opened ? 'visible opacity-100' : ' invisible h-0 opacity-0')
        }>
        <h1 className="py-3.5 font-medium">Subcategories</h1>
        <ul>
          {selectedCategory.subCategories.map((category) => {
            return (
              <li onClick={() => {}} className="cursor-pointer py-3.5 text-gray-700 last:pt-3.5">
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
