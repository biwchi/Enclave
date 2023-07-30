import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum CategoryTypes {
  SMARTPHONE = 'smartphone',
  LAPTOP = 'laptop',
  PC = 'PC',
  TV = 'tv',
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id ' })
  id: string;

  @Column({
    type: 'enum',
    enum: CategoryTypes,
  })
  type: string;
}
