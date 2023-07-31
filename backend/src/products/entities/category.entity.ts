import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

export enum CategoryTypes {
  SMARTPHONE = 'smartphone',
  LAPTOP = 'laptop',
  PC = 'PC',
  TV = 'tv',
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CategoryTypes,
  })
  type: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
