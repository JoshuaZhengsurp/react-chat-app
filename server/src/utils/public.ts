import { SetMetadata } from '@nestjs/common';

/**
 * @description 为对象添加元数据，是否属于白名单，如果处于白名单则不做鉴权处理
 * https://docs.nestjs.com/recipes/passport#enable-authentication-globally
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
