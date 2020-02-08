import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
 
import { InjectModel } from 'nestjs-typegoose';

import {Post as PostSchema} from './post.model'

@Controller('post')  // 路径(路由)
@ApiTags('文章')    // 接口文档标题
export class PostController {
  constructor(
    @InjectModel(PostSchema) private readonly PostModel
  ){}

  @Get()
  @ApiOperation({summary:'显示博客列表'}) // 接口描述
  async index(){  // 方法名，后端自用
    return await this.PostModel.find() // 数据库类方法
  }

  @Post()
  @ApiOperation({summary:'创建博客'})
  // 后端自用方法，参数获取前端入参，@Body/@Params 参数名:typescript数据类型/类class
  async create (@Body() createdPostDto:PostSchema) {
    await this.PostModel.create(createdPostDto)
    return {
      msg:'创建成功',
      data:createdPostDto
    }
  }

  @Get(':id')
  @ApiOperation({summary:'博客详情'})
  async detail(@Param('id') id:string){
    return this.PostModel.findById(id)
  }
  
  @Put(':id')
  @ApiOperation({summary:'编辑博客'})
  async update(@Param('id') id:string,@Body() updateDto:PostSchema){
    await this.PostModel.findByIdAndUpdate(id,updateDto)
    return {
      msg:'修改成功',
      data:updateDto
    }
  }
  
  @Delete(':id')
  @ApiOperation({summary:'删除博客'})
  async remove(@Param('id') id:string){
    await this.PostModel.findByIdAndDelete(id)
    return {
      msg:`成功删除${id}博客`
    }
  }
}
