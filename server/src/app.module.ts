import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './db/prisma.module';

@Module({
  imports: [
    SocketModule,
    UserModule,
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    PrismaModule,
    // MongooseModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
