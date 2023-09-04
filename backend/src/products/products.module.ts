import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/subCategory.entity';
import { WishlistItem } from 'src/wishlist/entities/wishlist-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, SubCategory, WishlistItem]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
