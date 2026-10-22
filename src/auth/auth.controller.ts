import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { dot } from 'node:test/reporters';
import { LogInDto, RegisterDto } from './auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signUp(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
    // return {ok:true}
  }

  @Post('login')
  signIn(@Body() dto: LogInDto) {
    return this.authService.login(dto);
  }
}
