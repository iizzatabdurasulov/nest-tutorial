import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module.js';
import { JwtStrategy } from './jwt.strategy.js';

@Module({

    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || "super_secret_key",
            signOptions: {expiresIn: '1d'}
        }),
    ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy ],
})
export class AuthModule {}
