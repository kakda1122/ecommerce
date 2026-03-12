import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('/:id')
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Get()
  getAllTasks() {
    return this.taskService.findAll();
  }

  @Post('/')
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }

  @Patch('/:id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<CreateTaskDto>) {
    return this.taskService.update(id, body);
  }

  @Patch('/:id/done')
  markTaskAsDone(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.update(id, { completed: true });
  }

  @Patch('/:id/pending')
  markTaskAsPending(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.update(id, { completed: false });
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }
}
