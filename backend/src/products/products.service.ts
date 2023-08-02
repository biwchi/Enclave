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
import { Category } from './entities/category.entity';
import { handleUUID } from 'src/utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepositry: Repository<Category>,
  ) {}

  public async create(createProductDto: CreateProductDto) {
    await this.checkCategory(createProductDto.category);
    const newProduct = await this.productRepository.insert({
      ...createProductDto,
      category: {
        id: createProductDto.category,
      },
    });
    return { ...newProduct.raw, ...createProductDto };
  }

  public async productByCategory(category: number) {
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

  public async getCategory() {
    return await this.categoryRepositry.find();
  }

  public async findAll() {
    return await this.productRepository.find({
      relations: {
        category: true,
      },
    });
  }

  public async findOne(id: string) {
    handleUUID(id);
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

  public async update(id: string, updateProductDto: UpdateProductDto) {
    handleUUID(id);
    await this.checkCategory(updateProductDto.category);
    await this.productRepository.update(id, {
      ...updateProductDto,
      category: { id: updateProductDto.category },
    });

    return `${id} updated`;
  }

  public async remove(id: string) {
    handleUUID(id);
    await this.productRepository.delete(id);
    return;
  }

  protected async checkCategory(category: number) {
    const isCategoryExist = await this.categoryRepositry.findOne({
      where: {
        id: category,
      },
    });

    if (!isCategoryExist && category) {
      throw new BadRequestException("This category doesn't exist");
    }
  }
}
