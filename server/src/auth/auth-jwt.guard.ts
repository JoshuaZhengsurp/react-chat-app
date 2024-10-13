import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/utils/public';

/**
 * 进行 JWT 身份验证的路由 加装守卫
 */

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  //  验证token
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    
    // verify token
    return super.canActivate(context);
  }

  /**
   * @description 验证完成后的回调
   * @param {*} error Passport 策略执行过程中发生的任何潜在错误。如果在验证过程中没有错误发生，这个值通常是 null
   * @param {*} user Passport 策略验证成功后返回的用户对象。如果验证失败，这个值可能是 false 或 null，具体取决于你使用的 Passport 策略
   * @param {*} info 如果验证失败，info为error对象
   */
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    console.log('handleRequest', err, user, info);
    if (info || err) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'token校验失败',
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: '用户不存在',
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
