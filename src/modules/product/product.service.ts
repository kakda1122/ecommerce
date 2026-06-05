import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  create(productData: Partial<Product>) {
    const product = this.productRepo.create(productData);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find({ relations: ['category'] });
  }

  findOne(id: number) {
    return this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async update(id: number, updateData: Partial<Product>) {
    await this.productRepo.update(id, updateData);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
