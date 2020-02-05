import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { PostModel } from './post.model';
 
import { IsNotEmpty } from 'class-validator'

// 传入参数类型限制,一般抽象成单独一个文件
class CreatedPostDto{
  @ApiProperty({description:'文章标题',example:'文章标题1'})
  @IsNotEmpty({message:'文章标题不能为空'})
  title: string
  @ApiProperty({description:'文章内容',example:'文章内容1'})
  @IsNotEmpty({message:'文章内容不能为空'})
  content: string
}


@Controller('post')  // 路径(路由)
@ApiTags('文章')    // 接口文档标题
export class PostController {
  @Get()
  @ApiOperation({summary:'显示博客列表'}) // 接口描述
  async index(){  // 方法名，后端自用
    return await PostModel.find() // 数据库类方法
  }

  @Post()
  @ApiOperation({summary:'创建博客'})
  // 后端自用方法，参数获取前端入参，@Body/@Params 参数名:typescript数据类型/类class
  async create (@Body() createdPostDto:CreatedPostDto) {
    await PostModel.create(createdPostDto)
    return {
      msg:'创建成功',
      data:createdPostDto
    }
  }

  @Get(':id')
  @ApiOperation({summary:'博客详情'})
  async detail(@Param('id') id:string){
    return PostModel.findById(id)
  }
  
  @Put(':id')
  @ApiOperation({summary:'编辑博客'})
  async update(@Param('id') id:string,@Body() updateDto:CreatedPostDto){
    await PostModel.findByIdAndUpdate(id,updateDto)
    return {
      msg:'修改成功',
      data:updateDto
    }
  }
  
  @Delete(':id')
  @ApiOperation({summary:'删除博客'})
  async remove(@Param('id') id:string){
    await PostModel.findByIdAndDelete(id)
    return {
      msg:`成功删除${id}博客`
    }
  }
}
