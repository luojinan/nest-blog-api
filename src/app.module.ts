import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

import { TypegooseModule } from 'nestjs-typegoose'
@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost/nest-blog-api"),
    PostModule
  ],  // 引入子路径控制器模块(路由)
  controllers: [AppController], // 根路径控制器(路由)
  providers: [AppService],
})
export class AppModule {}
