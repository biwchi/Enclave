import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

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

  @Column({
    type: 'enum',
    enum: CategoryTypes,
  })
  type: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
