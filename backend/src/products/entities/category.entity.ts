import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  subCategories: SubCategory[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
