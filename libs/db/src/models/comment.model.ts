import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, Prop, PropType, Ref } from "@typegoose/typegoose";
import { Course } from "./course.model";
import { Episode } from "./episode.model";
import { User } from "./user.model";

//为数据添加创建时间和更新时间  
@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})
export class Comment {
 
    @Prop({ref:'User'})
    user:Ref<User>

    //枚举
    @Prop({enum:['Course','Episode']})
    type:string

    //动态参考，参考哪个字段（参考上边的type
    @Prop({refPath:'type'})
    object:Ref<Course|Episode>

    //操作名
    @Prop()
    content:string

}