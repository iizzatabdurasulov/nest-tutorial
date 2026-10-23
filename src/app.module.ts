import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductController } from './product/product.controller.js';
import { ProductService } from './product/product.service.js';
import { ProductModule } from './product/product.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'nest-tutorial',
    }),
    ProductModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
