import GridIcon from '@/assets/icons/GridIcon';
import CustomSelect from '../BaseComponents/BaseSelect';
import IconButton from '../BaseComponents/BaseIconButton';
import RowsIcon from '@/assets/icons/RowsIcon';
import { useShopStore } from '@/store/shopStore';
import { useState } from 'react';
import { ItemTitleValue } from '@/services/types';
import { ProductsOrderig } from '@/constants/enums';

type ShopPageHeaderProps = {
  title?: string;
  viewMode: 'grid' | 'rows';
  changeMode: (mode: 'grid' | 'rows') => void;
};

const sorting: ItemTitleValue<ProductsOrderig>[] = [
  {
    title: 'Price ascending',
    value: ProductsOrderig.PRICE_ACS
  },
  {
    title: 'Price descinding',
    value: ProductsOrderig.PRICE_DESC
  },
  {
    title: 'Rating',
    value: ProductsOrderig.RATING
  },
  { title: 'Popular', value: ProductsOrderig.POPULAR }
];
const productPerPage = [
  { title: '20 products/page', value: 20 },
  { title: '40 products/page', value: 40 },
  { title: '60 products/page', value: 60 }
];

export default function ShopPageHeader({
  title = 'Shop',
  viewMode,
  changeMode
}: ShopPageHeaderProps) {
  const { filters, setFilters, meta } = useShopStore();

  return (
    <div className="rounded-md border border-solid border-gray-100 p-5">
      <div className="flex items-center justify-between border-b border-solid border-gray-100 pb-5">
        <h1 className="text-3xl font-medium">{title}</h1>
        <div>
          <span className="text-gray-700">Showing</span>
          <b className="px-1">1-{filters.page_size}</b>
          <span className="text-gray-700">of</span>
          <b className="px-1">{meta.count}</b>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-2">
          <IconButton
            onClick={() => changeMode('grid')}
            selected={viewMode === 'grid'}
            icon={<GridIcon width={18} height={18} className="text-gray-500" />}
          />
          <IconButton
            onClick={() => changeMode('rows')}
            selected={viewMode === 'rows'}
            icon={<RowsIcon />}
          />
        </div>
        <div className="flex gap-2">
          <CustomSelect
            selected={sorting.find((sort) => sort.value === filters.ordering)}
            onSelect={(ordering) => setFilters({ ordering: ordering.value })}
            options={sorting}
            rouneded
          />
          <CustomSelect
            selected={productPerPage.find((value) => value.value === filters.page_size)}
            onSelect={(value) => setFilters({ page_size: value ? Number(value.value) : 20 })}
            options={productPerPage}
            rouneded
          />
        </div>
      </div>
    </div>
  );
}
