import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  create(categoryData: Partial<Category>) {
    const category = this.categoryRepo.create(categoryData);
    return this.categoryRepo.save(category);
  }

  findAll() {
    return this.categoryRepo.find({ relations: ['products'] });
  }

  findOne(id: number) {
    return this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async update(id: number, updateData: Partial<Category>) {
    await this.categoryRepo.update(id, updateData);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.categoryRepo.delete(id);
  }
}
