import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  public async create(createReviewDto: CreateReviewDto, user: string) {
    try {
      await this.reviewRepository.save({
        ...createReviewDto,
        product: {
          id: createReviewDto.productId,
        },
        user: {
          id: user,
        },
      });
    } catch (error) {
      const err = error as TypeORMError;
      throw new InternalServerErrorException(err.message);
    }
  }
}
