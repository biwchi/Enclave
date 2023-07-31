import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid', { name: 'product_id' })
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Category, (category) => category.id, {
    onDelete: 'CASCADE',
  })
  category: Category;
}
