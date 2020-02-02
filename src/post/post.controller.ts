import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

// 传入参数类型限制,一般抽象成单独一个文件
class CreatedPostDto{
  @ApiProperty({description:'文章标题'})
  title: string
  @ApiProperty({description:'文章内容'})
  content: string
}


@Controller('post')
@ApiTags('文章')
export class PostController {
  @Get()
  @ApiOperation({summary:'显示博客列表'})
  index(){
    return [
      {id:1},
      {id:1},
      {id:1},
      {id:1},
      {id:1}
    ]
  }

  @Post()
  @ApiOperation({summary:'创建博客'})
  created (@Body() body:CreatedPostDto) {
    return body
  }

  @Get(':id')
  @ApiOperation({summary:'博客详情'})
  detail(@Param('id') id:string){
    return {
      id,
      title:'标题1'
    }
  }
  
  @Put(':id')
  @ApiOperation({summary:'编辑博客'})
  update(@Param('id') id:string,@Body() body:CreatedPostDto){
    return {
      id,
      ...body
    }
  }
  
  @Delete(':id')
  @ApiOperation({summary:'删除博客'})
  remove(@Param('id') id:string){
    return {
      id,
      msg:`成功删除${id}博客`
    }
  }
}
