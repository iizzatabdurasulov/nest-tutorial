import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../users/user.decorator.js';
import { ProductDto } from './product.dto.js';
import { ProductService } from './product.service.js';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Create product
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@CurrentUser() user: { userId: number }, @Body() data: ProductDto) {
    return this.productService.create(data, user.userId);
  }

  // Get all product
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // Get product by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  // Delete  products by users
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteByUser(@CurrentUser() user: { userId: number }) {
    return this.productService.deleteAllByUser(user.userId);
  }

  // Delete all products from db
  @UseGuards(AuthGuard('jwt'))
  @Delete('all')
  deleteAll(@CurrentUser() user: { userId: number; role: string }) {
    if (user.role !== 'admin') {
      throw new ForbiddenException('You are not admin');
    }
    return this.productService.deleteAll();
  }

  // Delete product by id
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(
    @CurrentUser() user: { userId: number },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productService.delete(id, user.userId);
  }

  //  Update product
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @CurrentUser() user: { userId: number },
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProductDto,
  ) {
    return this.productService.update(id, user.userId, body);
  }
}
