import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [PostModule],  // 引入子路径控制器模块(路由)
  controllers: [AppController], // 根路径控制器(路由)
  providers: [AppService],
})
export class AppModule {}
