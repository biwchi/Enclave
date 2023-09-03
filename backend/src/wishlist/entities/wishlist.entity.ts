import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WishlistItem } from './wishlist-item.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.wishlist)
  @JoinColumn()
  user: User;

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.wishlist)
  products: WishlistItem[];
}
