import { EntitySubscriberInterface, EventSubscriber, LoadEvent } from 'typeorm';
import { Product } from '../entities/product.entity';

@EventSubscriber()
export class UpdateProductRating implements EntitySubscriberInterface<Product> {
  listenTo(): string | Function {
    return Product;
  }

  async afterLoad(entity: Product, event?: LoadEvent<Product>) {
    if (
      entity.rating == Number(entity.ratingVirtual) &&
      entity.reviewCount === entity.reviewCountVirtual
    ) {
      return;
    }

    await event.manager.update(Product, entity.id, {
      reviewCount: entity.reviewCountVirtual ? entity.reviewCountVirtual : 0,
      rating: entity.ratingVirtual ? entity.ratingVirtual : 0,
    });
  }
}
