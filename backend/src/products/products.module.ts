import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/subCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, SubCategory])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
