import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

interface UserPlayLoad {
  email: string;
  id: string | number;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(user: UserPlayLoad) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  /**
   * @description 验证密码
   */
  async validatePassword(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return compare(plainTextPassword, hashPassword);
  }
}
