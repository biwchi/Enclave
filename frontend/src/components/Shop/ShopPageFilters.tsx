import { useState } from 'react';
import ShopPageFilter from './ShopPageFilter';
import ShopPageFilterCategories from './ShopPageFilterCategories';
import { Option } from '../UI/CustomSelect';

export default function ShopPageFilters() {
  const [selectedBrand, setSelectedBrand] = useState<Option>('Apple');
  return (
    <div>
      <ShopPageFilterCategories />
      <div className="pt-5">
        <ShopPageFilter
          selected={selectedBrand}
          onSelect={(option) => setSelectedBrand(option)}
          title="Brand"
          options={['Appge', 'Samsung', 'Xiaomi']}
        />
      </div>
    </div>
  );
}
