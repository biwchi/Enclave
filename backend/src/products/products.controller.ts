import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DefaultQuery } from 'src/common/dto/defaultQuery.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProductFilters } from './dto/product-filters.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { ExtractUser, JwtUser } from 'src/auth/decorators/extractUser';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @Post('category')
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Query('sub') sub?: boolean,
  ) {
    return this.productsService.createCategory(createCategoryDto, sub);
  }

  @Get()
  findAll(
    @Query() defaultQuery: DefaultQuery,
    @ExtractUser() user: JwtUser,
    @Query() productFilters?: ProductFilters,
  ) {
    return this.productsService.findAll(defaultQuery, productFilters, user?.id);
  }

  @Get('category')
  findCategories(@Query() defaultQuery: DefaultQuery) {
    return this.productsService.getCategories(defaultQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
