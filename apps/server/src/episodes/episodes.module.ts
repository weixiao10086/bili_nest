import { Course } from '@libs/db/models/course.model';
import { Episode } from '@libs/db/models/episode.model';
import { Module } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { EpisodesController } from './episodes.controller';

@Module({
  controllers: [EpisodesController]
})
export class EpisodesModule {
  constructor(@InjectModel(Episode) private readonly model:ReturnModelType<typeof Episode>){}

}
