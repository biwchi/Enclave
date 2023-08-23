import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { handleUUID } from 'src/utils';
import { DefaultQuery } from 'src/common/dto/defaultQuery.dto';
import { DefaultResponse } from 'src/common/dto/defaultResponse.dto';
import { DefaultMetaResponse } from 'src/common/dto/defaultMetaResponse.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SubCategory } from './entities/subCategory.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepositry: Repository<Category>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepositry: Repository<SubCategory>,
  ) {}

  public async create(createProductDto: CreateProductDto) {
    console.log(createProductDto);
    await this.checkCategory(createProductDto.category);
    const newProduct = await this.productRepository.insert({
      ...createProductDto,
      imageUrl: createProductDto.imageUrl,
      category: {
        id: createProductDto.category,
      },
    });
    return { ...newProduct.raw, ...createProductDto };
  }

  public async createCategory(
    createCategoryDto: CreateCategoryDto,
    sub?: boolean,
  ) {
    if (sub) {
      await this.subCategoryRepositry.insert({
        ...createCategoryDto,

        category: { id: createCategoryDto.id },
      });
    } else {
      console.log(createCategoryDto);
      await this.categoryRepositry.insert({ title: createCategoryDto.title });
    }
  }

  public async getCategories(defaultQuery: DefaultQuery) {
    const [categories, itemCount] = await this.categoryRepositry.findAndCount({
      relations: { subCategories: true },
      skip: defaultQuery.skip,
      take: defaultQuery.page_size,
    });

    const meta = new DefaultMetaResponse({
      defaultQuery,
      itemCount,
    });

    return new DefaultResponse(categories, meta);
  }

  public async findAll(defaultQuery: DefaultQuery, category?: number) {
    const [products, itemCount] = await this.productRepository.findAndCount({
      relations: {
        category: { subCategories: true },
      },
      where: {
        category: {
          id: category ? category : undefined,
        },
        title: defaultQuery.search ? Like(`%${defaultQuery.search}%`) : null,
      },
      skip: defaultQuery.skip,
      take: defaultQuery.page_size,
    });

    const meta = new DefaultMetaResponse({
      itemCount,
      defaultQuery,
    });

    return new DefaultResponse<Product>(products, meta);
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
    console.log(updateProductDto);
    await this.productRepository.update(id, {
      ...updateProductDto,
      imageUrl: updateProductDto.imageUrl,
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
