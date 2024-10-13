# Nest 实践

## 起步
```shell
pnpm i nest -g
nest create [PROJECT NAME]
```

## 环境变量配置
``pnpm i @nestjs/config``
> 注意：内部依赖dotenv，要求 ``Ts>=4.1``




## 集成Swagger文档
```shell
pnpm i @nest/swagger
```
在main.js配置
```js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const appOptions = { cors: true };
const appVersion = process.env.APP_SERVER_VERSION || 'x.x.x';

console.log(process.env);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, appOptions);
  const port = 4000;

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
```

## 模块
```shell
npx nest g resource [MODULE NAME]
/**
  * dto
  * entities
  * xxx.controller
  * xxx.module
  * xxx.service
  */
```

## 链接数据库
1. mongodb
   ``pnpm i @nestjs/mongoose mongoose``

2. redis

3. mysql
   ````
  




## Problem
getAllAndOverride


## gain
1. how to use prisma
2. how to build auth