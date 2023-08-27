import ShopPageFilter from './ShopPageFilter';
import ShopPageFilterCategories from './ShopPageFilterCategories';
import ShopPageSliderFilter from './ShopPageSliderFilter';
import { useShopStore } from '@/store/shopStore';

export default function ShopPageFilters() {
  const { filters, setFilters } = useShopStore();
  return (
    <div>
      <ShopPageFilterCategories />
      <div>
        <ShopPageFilter
          selected={filters.brand}
          onSelect={(option) =>
            setFilters({ brand: typeof option === 'object' ? option : undefined })
          }
          title="Brand"
          options={[
            { title: 'Apple', value: 1 },
            { title: 'Samsung', value: 2 }
          ]}
        />
        <div className="rounded-md border border-solid border-gray-100 p-5">
          <h1 className="font-medium">Price</h1>
          <div className="py-5">
            <ShopPageSliderFilter
              min={0}
              max={4000}
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
          showItemLength={5}
          selected={filters.rating}
          onSelect={(option) => setFilters({ rating: Number(option) })}
          title="Rating"
          options={[5, 4, 3, 2, 1]}
        />
      </div>
    </div>
  );
}
