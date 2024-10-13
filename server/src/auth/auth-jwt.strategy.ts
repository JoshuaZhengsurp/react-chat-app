import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { PrismaService } from 'src/db/prisma.service';

/**
 * @description 验证 JWT 令牌
 */

@Injectable()
export class JwtStragegy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中提取 JWT
      secretOrKey: config.get('JWT_SECRETORKEY'), // 用于验证 token 的秘钥
    } as StrategyOptions);
  }

  async validate({ sub }) {
    return await this.prisma.user.findUnique({
      where: {
        id: sub,
      },
    });
  }
}
