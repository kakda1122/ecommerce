import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(Number(id));
  }

  @Post()
  create(@Body() categoryData: Partial<Category>) {
    return this.categoryService.create(categoryData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Category>) {
    return this.categoryService.update(Number(id), updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(Number(id));
  }
}
