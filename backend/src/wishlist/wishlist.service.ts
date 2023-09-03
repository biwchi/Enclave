import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorDescription, Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { handleUUID } from 'src/utils';
import { WishlistItem } from './entities/wishlist-item.entity';
import { DefaultResponse } from 'src/common/dto/defaultResponse.dto';
import { DefaultMetaResponse } from 'src/common/dto/defaultMetaResponse.dto';
import { DefaultQuery } from 'src/common/dto/defaultQuery.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    @InjectRepository(WishlistItem)
    private readonly wishlistItemRepository: Repository<WishlistItem>,
  ) {}

  async addToWishlist(id: string, userId: string) {
    handleUUID(id);

    const wishlist = await this.wishlistRepository.findOne({
      where: { user: { id: userId } },
    });

    try {
      await this.wishlistItemRepository.insert({
        product: { id: id },
        wishlist: { id: wishlist.id },
      });
    } catch (error) {
      const err = error as ErrorDescription;
      throw new InternalServerErrorException(err.detail);
    }
  }

  async getWishlist(defaultQuery: DefaultQuery, userId: string) {
    handleUUID(userId);
    const [products, itemCount] =
      await this.wishlistItemRepository.findAndCount({
        relations: {
          product: { category: true },
        },
        where: { wishlist: { user: { id: userId } } },
      });

    const meta = new DefaultMetaResponse({
      defaultQuery: defaultQuery,
      itemCount,
    });

    return new DefaultResponse(
      products.map((prodcut) => prodcut.product),
      meta,
    );
  }
}
