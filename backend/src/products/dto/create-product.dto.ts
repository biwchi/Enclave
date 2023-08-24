import { IsInt, Max } from 'class-validator';

export class CreateProductDto {
  title: string;
  description: string;
  price: number;
  category: number;
  subCategory: number;
  imageUrl: string;
}
