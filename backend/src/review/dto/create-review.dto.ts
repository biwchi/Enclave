import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
  @Type(() => Number)
  @IsInt()
  @Max(5)
  @Min(1)
  rating: number;

  @Type(() => String)
  @MinLength(10)
  @MaxLength(700)
  @IsString()
  @IsOptional()
  review?: string;

  @IsUUID()
  productId: string;
}
