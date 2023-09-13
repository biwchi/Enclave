import ShopPageFilter from './ShopPageFilter';
import ShopPageFilterCategories from './ShopPageFilterCategories';
import ShopPageSliderFilter from './ShopPageSliderFilter';
import { useShopStore } from '@/store/shopStore';

const brands = [
  { title: 'Apple', value: '1' },
  { title: 'Samsung', value: '2' }
];

export default function ShopPageFilters() {
  const { filters, setFilters } = useShopStore();
  return (
    <div>
      <ShopPageFilterCategories />
      <div>
        <ShopPageFilter
          selected={brands.find((brand) => brand.value === filters.brand)}
          onSelect={(brand) => setFilters({ brand: brand?.value })}
          title="Brand"
          options={brands}
        />
        <div className="rounded-md border border-solid border-gray-100 p-5">
          <h1 className="font-medium">Price</h1>
          <div className="py-5">
            <ShopPageSliderFilter
              min={filters.priceMin ?? 0}
              max={filters.priceMax ?? 4000}
              onChange={({ min, max }) => {
                setFilters({ priceMin: min, priceMax: max });
              }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Price: ${filters.priceMin} - ${filters.priceMax}
          </p>
        </div>
        <ShopPageFilter
          ratingStart
          showItemLength={5}
          selected={filters.rating}
          onSelect={(rating) => setFilters({ rating })}
          title="Rating"
          options={[5, 4, 3, 2, 1]}
        />
      </div>
    </div>
  );
}
