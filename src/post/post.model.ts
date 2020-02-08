import { prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
// 使用TypeScript语法，创建mongoose数据库表
export class Post {
  @ApiProperty({description:'文章标题',example:'文章标题1'})
  @IsNotEmpty({message:'文章标题不能为空'})
  @prop()
  title:string
  
  @ApiProperty({description:'文章内容',example:'文章内容1'})
  @IsNotEmpty({message:'文章内容不能为空'})
  @prop()
  content:string
}


