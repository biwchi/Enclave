import { IsInt, Max } from 'class-validator';

export class CreateProductDto {
  title: string;
  description: string;
  @IsInt({ message: 'Price is too big' })
  price: number;

  @IsInt({ message: 'Invalid category id' })
  category: number;

  imageUrl?: string;
}
