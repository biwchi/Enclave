import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product, (product) => product)
  @JoinColumn()
  product_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Cart, (cart) => cart.items, {onDelete: 'CASCADE'})
  cart: Cart;
}
