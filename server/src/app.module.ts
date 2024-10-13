import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './db/prisma.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { JwtStragegy } from './auth/auth-jwt.strategy';
import { JwtAuthGuard } from './auth/auth-jwt.guard';

@Module({
  imports: [
    SocketModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    PrismaModule,
    ChatModule,
    AuthModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRETORKEY'),
          signOptions: {
            expiresIn: '7d',
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStragegy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

/**
 * 在providers注入策略和守卫，其中守卫通过import引入的APP_GUARD注册为全局的守卫，当然全局守卫是可以多个的。
 */
