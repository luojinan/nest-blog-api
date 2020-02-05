import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // 连接数据库mongoose，不使用依赖
  mongoose.connect('mongodb://localhost/nest-blog-api',{
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true
  })

  // 实例化后端服务
  const app = await NestFactory.create(AppModule);

  // 使用nestjs原生管道作入参判断
  app.useGlobalPipes(new ValidationPipe())  // 管道（类似中间件）
  
  // swagger网页接口文档自动生成依赖的配置
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
