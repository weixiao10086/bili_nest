import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { EpisodesModule } from './episodes/episodes.module';
import { SwiperimgModule } from './swiperimg/swiperimg.module';
import { OperationModule } from './operation/operation.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [AuthModule,DbModule,CourseModule,EpisodesModule, SwiperimgModule, OperationModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
