import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Ordering } from 'src/common/constant/Ordering';
import { ProductsOrderig } from '../constants';

export default class productFilters {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  brand?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  priceMax?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  priceMin?: number = 0;

  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  ordering?: ProductsOrderig;
}
