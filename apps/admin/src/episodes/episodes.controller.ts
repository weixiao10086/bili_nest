import { Course } from '@libs/db/models/course.model';
import { Episode } from '@libs/db/models/episode.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model: Episode,
    // //关闭该模块的特定接口
    // routes:{
    //     create:false,
    //     update:false,
    //     delete:false,
    // }
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
    constructor(
        @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>,
        @InjectModel(Course) private readonly coursemodel: ReturnModelType<typeof Course>

    ) { }

    @Get('option')
    async option() {

        const courses = (await this.coursemodel.find()).map(v => (
            {
                label: v.name,
                value: v._id,
            }
        ))

        return courses
    }
}
