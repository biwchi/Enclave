import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DefaultQuery } from 'src/common/dto/defaultQuery.dto';

@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':id')
  addProductWishlist(
    @Req() req,
    @Param('id')
    id: string,
  ) {
    return this.wishlistService.addToWishlist(id, req.user.id);
  }

  @Get()
  getWishlist(@Query() defaultQuery: DefaultQuery, @Req() req) {
    return this.wishlistService.getWishlist(defaultQuery, req.user.id);
  }
}
