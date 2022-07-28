import { Module } from '@nestjs/common';
import { SwiperimgController } from './swiperimg.controller';

@Module({
  controllers: [SwiperimgController]
})
export class SwiperimgModule {
}
