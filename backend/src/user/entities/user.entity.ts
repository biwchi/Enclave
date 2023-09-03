import { Cart } from 'src/cart/entities/cart.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToOne(() => Wishlist, (wishlist) => wishlist.user)
  wishlist: Wishlist;
}
