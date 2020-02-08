import { prop } from '@typegoose/typegoose';
// 使用TypeScript语法，创建mongoose数据库表
export class Post {
  @prop()
  title:string
  @prop()
  content:string
}


