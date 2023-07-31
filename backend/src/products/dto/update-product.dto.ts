import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Max } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @Max(2147483645, { message: 'Price is too big' })
  price?: number;

  @Max(2147483645, { message: 'Invalid category id' })
  category?: number;
}
