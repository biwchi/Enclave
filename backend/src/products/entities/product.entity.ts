import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  CreateDateColumn,
  DataSource,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VirtualColumn,
  createQueryBuilder,
  getManager,
} from 'typeorm';
import { Category } from './category.entity';
import { SubCategory } from './subCategory.entity';
import { Review } from 'src/review/entities/review.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @VirtualColumn({
    type: 'float4',
    query: (alias) =>
      `SELECT AVG(rating) FROM review WHERE "productId" = ${alias}.id`,
  })
  rating: number;

  @VirtualColumn({
    query: (alias) =>
      `SELECT COUNT(*) FROM review WHERE "productId" = ${alias}.id`,
  })
  reviewCount: number;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.id, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @OneToOne(() => SubCategory, (subCategory) => subCategory.id)
  @JoinColumn()
  subCategory: SubCategory;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
