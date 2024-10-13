import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const whiteUrl = [process.env.APP_WEB_URL];

const appOptions = {
  cors: true,
};
const appVersion = process.env.APP_SERVER_VERSION || 'x.x.x';

async function bootstrap() {  
  const app = await NestFactory.create(AppModule, appOptions);
  const port = 4000;
  app.enableCors({
    origin: whiteUrl,
  });
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('JoshuaZheng')
    .setDescription('surp')
    .setVersion(appVersion)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(port);
  Logger.log(`服务已启动，请访问http://localhost:${port}`);
  Logger.log(`接口文档请访问http://localhost:${port}/api-docs`);
}
bootstrap();
