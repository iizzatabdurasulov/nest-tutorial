import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './users.dto.js';
import type { AuthUser } from './users.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Userni faqat o'zi yoki admin/owner o'zgartira yoki o'chira oladi
  private async checkAccess(targetId: number, currentUser: AuthUser) {
    const user = await this.prisma.user.findUnique({
      where: { id: targetId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isAdmin =
      currentUser.role === 'admin' || currentUser.role === 'owner';

    if (currentUser.userId !== targetId && !isAdmin) {
      throw new ForbiddenException('You can only change your own account');
    }
  }

  // Update user
  async update(id: number, currentUser: AuthUser, dto: UpdateUserDto) {
    await this.checkAccess(id, currentUser);

    if (dto.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('This email already registered');
      }
    }

    const data = { ...dto };

    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      omit: { password: true },
    });
  }

  // Delete user
  async delete(id: number, currentUser: AuthUser) {
    await this.checkAccess(id, currentUser);

    // Product.userId ON DELETE RESTRICT, shuning uchun avval userning productlarini o'chiramiz
    await this.prisma.$transaction([
      this.prisma.product.deleteMany({ where: { userId: id } }),
      this.prisma.user.delete({ where: { id } }),
    ]);

    return { message: 'User deleted' };
  }
}
