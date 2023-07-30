import { Cart } from 'src/cart/entities/cart.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Cart, (cart) => cart.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  cart: Cart;

  @CreateDateColumn()
  createdAt: Date;
}
