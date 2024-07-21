import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 4000;
  await app.listen(port);
  Logger.log(`服务已启动，请访问http://localhost:${port}`)
}
bootstrap();
