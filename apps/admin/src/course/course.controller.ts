import { Course } from '@libs/db/models/course.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model:Course
})
@Controller('course')
@ApiTags('课程')
export class CourseController {                                         //数据类型-泛型
    constructor(@InjectModel(Course) private readonly model:ReturnModelType<typeof Course>){}
}
