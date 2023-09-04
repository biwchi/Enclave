import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VirtualColumn,
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

  @Column({
    type: 'float4',
    nullable: true,
  })
  rating: number;

  @Column({
    nullable: true,
  })
  reviewCount: number;

  @VirtualColumn({
    type: 'double',
    query: (alias) =>
      `SELECT CAST(AVG(rating) AS DECIMAL (12,2)) FROM review WHERE "productId" = ${alias}.id`,
  })
  ratingVirtual: number;

  @VirtualColumn({
    query: (alias) =>
      `SELECT COUNT(*) FROM review WHERE "productId" = ${alias}.id`,
  })
  reviewCountVirtual: number;

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
