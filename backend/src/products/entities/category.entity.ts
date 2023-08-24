import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  VirtualColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { SubCategory } from './subCategory.entity';

export enum CategoryTypes {
  SMARTPHONE = 'Smartphone',
  LAPTOP = 'Laptop',
  PC = 'PC',
  TV = 'TV',
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  title: string;

  @VirtualColumn({
    query: (alias) =>
      `SELECT COUNT(*) FROM "product" WHERE "categoryId" = ${alias}.id`,
  })
  totalProducts: number;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  subCategories: SubCategory[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
