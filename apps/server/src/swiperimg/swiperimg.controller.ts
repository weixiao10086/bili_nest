import { Swiper } from '@libs/db/models/swiperimg.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model: Swiper,
    //关闭该模块的特定接口
    // routes:{
    //     create:false,
    //     update:false,
    //     delete:false,
    // }
})

@Controller('swiperimg')
@ApiTags('首页轮播图')
export class SwiperimgController {
    constructor(@InjectModel(Swiper) private readonly model:ReturnModelType<typeof Swiper>){}



}
