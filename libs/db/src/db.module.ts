import { Global, Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { DbService } from './db.service';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';
import { User } from './models/user.model';
                                        //引用模块
const models=TypegooseModule.forFeature([User,Course,Episode])
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
    models
  ],
  providers: [DbService],
  exports: [DbService,models],
})
export class DbModule { }
