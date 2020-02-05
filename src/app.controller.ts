import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller() // 后端服务的根路径
@ApiTags('默认')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(){
    return 'index'
  }
  getHello(): string {
    return this.appService.getHello();
  }
}
