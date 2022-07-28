import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, Prop, Ref } from '@typegoose/typegoose'
import { hashSync } from 'bcryptjs'
import { Course } from './course.model'
//为数据添加创建时间和更新时间  
@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})
export class User {
    @ApiProperty({ description: '用户名', example: 'user1' })
    @Prop()
    username: string

    @ApiProperty({ description: '密码', example: 'password' })
    //不要明文保存密码 (散列)         //下载下面的包
    // cnpm i --save @types/bcryptjs bcryptjs
    @Prop({
        //返回是不返回密码（安全(创建时会展示，查询时不会展示)
        select: false,
        get(val) {
            return val
        },
        set(val) {//三目运算
            return val ? hashSync(val) : val
        }
    })
    password: string


    
    //扩展性不好的收藏方式
    // @Prop({ ref: 'Course' })
    // likes: Ref<Course>

}