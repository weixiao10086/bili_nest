import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, Prop, PropType, Ref } from "@typegoose/typegoose";
import { Course } from "./course.model";

//为数据添加创建时间和更新时间  
@modelOptions({
    schemaOptions:{
        timestamps: true,
    }
})
export class Episode {
    @ApiProperty({description:'封面',example:'封面1'})
    @Prop()
    name:   string;

    @ApiProperty({description:'封面',example:'文件'})
    @Prop()
    file: string;

// 所属课程
@ApiProperty({description:'所属课程',example:'{"_id":"62d7ee072645d3bbeea99cbf"}'})
    @Prop({ref:'Course'})
    // @Prop({ref:Course})
    // @Prop({ref:()=>Course})
    // @Prop({type:()=>Course})
    course:Ref<Course>
}