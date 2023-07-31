import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Category } from './entities/category.entity';
import { isInt32Array } from 'util/types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepositry: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const isCategoryExist = await this.categoryRepositry.findOne({
      where: {
        id: createProductDto.category,
      },
    });

    if (!isCategoryExist) {
      throw new BadRequestException("This category doesn't exist");
    }

    const newProduct = await this.productRepository.insert({
      ...createProductDto,
      category: {
        id: createProductDto.category,
      },
    });
    return { ...newProduct.raw, ...createProductDto };
  }

  async productByCategory(category: number) {
    return await this.productRepository.find({
      relations: {
        category: true,
      },
      where: [
        {
          category: {
            id: category,
          },
        },
      ],
    });
  }

  async findAll() {
    return await this.productRepository.find({
      relations: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    if (!isUUID(id)) throw new BadRequestException('ID is not valid');

    const product = await this.productRepository.findOne({
      relations: {
        category: true,
      },
      where: {
        id: id,
      },
    });
    if (product) return product;
    throw new NotFoundException();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (!isUUID(id)) throw new BadRequestException('ID is not valid');
    const isCategoryExist = await this.categoryRepositry.findOne({
      where: {
        id: updateProductDto.category,
      },
    });

    if (!isCategoryExist) {
      throw new BadRequestException("This category doesn't exist");
    }

    const product = await this.productRepository.update(id, {
      ...updateProductDto,
      category: { id: updateProductDto.category },
    });

    return;
  }

  remove(id: string) {
    if (!isUUID(id)) throw new BadRequestException('ID is not valid');

    

    return `This action removes a #${id} product`;
  }
}
