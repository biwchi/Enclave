import GridIcon from '@/assets/GridIcon';
import CustomSelect from '../UI/CustomSelect';
import IconButton from '../UI/IconButton';
import RowsIcon from '@/assets/RowsIcon';

type ShopPageHeaderProps = {
  title?: string;
  productsCount?: number;
};

const sorting = ['Ascending', 'Descinding', 'Rating', 'Popular'];

export default function ShopPageHeader({
  productsCount = 93248,
  title = 'Shop'
}: ShopPageHeaderProps) {
  return (
    <div className="rounded-md border border-solid border-gray-100 p-5">
      <div className="flex items-center justify-between border-b border-solid border-gray-100 pb-5">
        <h1 className="text-3xl font-medium">{title}</h1>
        <div>
          <span className="text-gray-700">Showing</span>
          <b className="px-1">1-20</b>
          <span className="text-gray-700">of</span>
          <b className="px-1">{productsCount}</b>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-2">
          <IconButton icon={<GridIcon width={18} height={18} className="text-gray-500" />} />
          <IconButton icon={<RowsIcon />} />
        </div>
        <div className="flex gap-2">
          <CustomSelect selected={'Rating'} onSelect={() => {}} options={sorting} rouneded />
          <CustomSelect selected={'Rating'} onSelect={() => {}} options={sorting} rouneded />
        </div>
      </div>
    </div>
  );
}
