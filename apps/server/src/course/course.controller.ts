import { Course } from "@libs/db/models/course.model";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ReturnModelType } from "@typegoose/typegoose";
import { Crud } from "nestjs-mongoose-crud";
import { InjectModel } from "nestjs-typegoose";

@Crud({
    model:Course,
      // //关闭该模块的特定接口
    routes:{
        create:false,
        update:false,
        delete:false,
    }
})
@Controller('course')
@ApiTags('课程')
export class CourseController {                                         //数据类型-泛型
    constructor(@InjectModel(Course) private readonly model:ReturnModelType<typeof Course>){}


}
