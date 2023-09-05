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
import { ExtractUser, JwtUser } from 'src/auth/decorators/extractUser';

@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  addProductWishlist(
    @Req() req,
    @Param('id')
    id: string,
  ) {
    return this.wishlistService.addToWishlist(id, req.user.id);
  }

  @Post(':id/remove')
  @UseGuards(JwtAuthGuard)
  removeProduct(@ExtractUser() user: JwtUser, @Param('id') id: string) {
    return this.wishlistService.removeWishlist(id, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getWishlist(@Query() defaultQuery: DefaultQuery, @Req() req) {
    return this.wishlistService.getWishlist(defaultQuery, req.user.id);
  }
}
