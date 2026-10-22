import { Module } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProductController } from './product.controller.js';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
