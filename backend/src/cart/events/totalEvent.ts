import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { CartItem } from '../entities/cart-item.entity';

@EventSubscriber()
export class CartUpdateTotal implements EntitySubscriberInterface<CartItem> {  
  listenTo(): string | Function {
      return CartItem
  }

  afterInsert(event: InsertEvent<CartItem>): void | Promise<any> {
      console.log("added")
  }
}