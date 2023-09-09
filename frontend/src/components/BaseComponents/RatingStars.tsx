import EmptyStarIcon from '@/assets/icons/stars/EmptyStarIcon';
import FillStarIcon from '@/assets/icons/stars/FillStarIcon';
import HalfStarIcon from '@/assets/icons/stars/HalfStarIcon';

type RatingStartProsp = {
  rating: number;
  reviewsCount: number;
};

export default function RatingStart({ rating, reviewsCount }: RatingStartProsp) {
  function checkRating(idx: number) {
    if (rating >= idx) {
      return <FillStarIcon className="text-warning-500" />;
    }

    if (idx <= Math.ceil(rating) && rating % 1 > 0.3 && rating % 1 < 0.7) {
      return <HalfStarIcon className="text-warning-500" />;
    }

    if (idx <= Math.ceil(rating) && rating % 1 > 0.7) {
      return <FillStarIcon className="text-warning-500" />;
    }

    return <EmptyStarIcon className="text-warning-500" />;
  }

  const stars = [...Array.from({ length: 5 })].map((_, idx) => checkRating(idx + 1));
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">{...stars}</div>
      {reviewsCount && <span className="text-sm text-gray-700">({reviewsCount})</span>}
    </div>
  );
}
