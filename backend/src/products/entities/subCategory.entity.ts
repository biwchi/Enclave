import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  VirtualColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @VirtualColumn({
    query: (alias) =>
      `SELECT COUNT(*) FROM "product" WHERE "subCategoryId" = ${alias}.id`,
  })
  totalProducts?: number;

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;
}
