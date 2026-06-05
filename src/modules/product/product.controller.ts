import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  @Post()
  create(@Body() productData: Partial<Product>) {
    return this.productService.create(productData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Product>) {
    return this.productService.update(Number(id), updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(Number(id));
  }
}
