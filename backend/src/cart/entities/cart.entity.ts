import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  total: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart_id)
  items: Cart[];
}
