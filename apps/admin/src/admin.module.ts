import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
import { CourseModule } from './course/course.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { Swiper } from '@libs/db/models/swiperimg.model';
import { SwiperimgModule } from './swiperimg/swiperimg.module';
const multer = require('multer');
const MAO = require('multer-aliyun-oss');

@Module({
  imports: [DbModule, UsersModule, CourseModule, EpisodesModule,SwiperimgModule,
    //上传图片配置
    MulterModule.register({
      //存放文件夹
      dest:'uploads'

      // oss云存储
      // storage:MAO({
      //   config:{
      //     region: 'ap-shanghai',
      //     accessKeyId: '<accessKeyId>',
      //     accessKeySecret: '',
      //     bucket: 'nestimg',
      //   }
      // })
    })
    
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
