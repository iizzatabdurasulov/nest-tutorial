import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Tokenni "Authorization: Bearer <token>" headeridan oladi
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Token yaratilgandagi secret bilan bir xil bo'lishi SHART
      secretOrKey: process.env.JWT_ACCESS_SECRET!,
    });
  }

  // Token to'g'ri bo'lsa, shu metod chaqiriladi
  // Nima qaytarsa, o'sha req.user ga yoziladi.
  async validate(payload: { sub: number; email: string; role: string }) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
