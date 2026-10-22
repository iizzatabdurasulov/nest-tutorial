import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password should be at least 6 characters' })
  @MaxLength(128, { message: 'Password should be maximum 128 characters' })
  password: string;
}

export class LogInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
