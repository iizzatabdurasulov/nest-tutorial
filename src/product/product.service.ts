import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProductDto } from './product.dto.js';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  // Create product

  create(data: ProductDto, userId: number) {
    return this.prisma.product.create({
      data: {
        ...data,
        userId: userId,
      },
    });
  }

  // Get products

  findAll() {
    return this.prisma.product.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  // Get product by id

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} topilmadi`);
    }

    return product;
  }

  // Delete  products by users
  async deleteAllByUser(userId: number) {
    return this.prisma.product.deleteMany({
      where: { userId },
    });
  }

  // Delete all products from db

  async deleteAll() {
    return this.prisma.product.deleteMany();
  }

  // Delete product by id
  async delete(productId: number, userId: number) {
    const product = await this.prisma.product.findFirst({
      where: { id: productId, userId: userId },
    });

    if (!product) {
      throw new NotFoundException(`sizga tegishli product topilmadi`);
    }

    return this.prisma.product.delete({
      where: { id: productId },
    });
  }
 
  // Update product
  async update(productId: number, userId: number, data: ProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.userId !== userId) {
      throw new ForbiddenException('You cannot update this product');
    }

    return this.prisma.product.update({
      where: { id: productId },
      data,
    });
  }
}
