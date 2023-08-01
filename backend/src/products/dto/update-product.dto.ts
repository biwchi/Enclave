import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Max } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
