import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class WishlistItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.products)
  wishlist: Wishlist;

  @OneToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product: Product;
}
