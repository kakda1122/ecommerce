import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
