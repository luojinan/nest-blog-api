import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  mongoose.connect('mongodb://localhost/nest-blog-api',{
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true
  })

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())  // 管道（类似中间件）

  const options = new DocumentBuilder()
    .setTitle('Nest博客api')
    .setDescription('我的第一个nestjs项目')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
