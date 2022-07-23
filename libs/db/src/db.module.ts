import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from "nestjs-typegoose";
import { DbService } from './db.service';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';
import { Swiper } from './models/swiperimg.model';
import { User } from './models/user.model';
                                        //引用模块
const models=TypegooseModule.forFeature([User,Course,Episode,Swiper])
//标记为全局模块
@Global()
@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost/topfullstack",
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false
    // }
    ),
    models,
    //全局注册jwt
    JwtModule.register({
      //jwt密钥（加密的
      secret:'jwtjwtjwtjwt'
    }),
  ],
  providers: [DbService],
                    //导出，确保其他地方可以使用
  exports: [DbService,models,JwtModule],
})
export class DbModule { }
