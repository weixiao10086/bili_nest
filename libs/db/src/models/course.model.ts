import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, Prop, Ref } from '@typegoose/typegoose'
import { Episode } from './episode.model'

//为数据添加创建时间和更新时间  
@modelOptions({
    schemaOptions: {
        timestamps: true,
        //虚拟字段
        toJSON:{
            virtuals:true
        }
    }
})
export class Course {
    @ApiProperty({ description: '课程名称', example: '课程名称1' })
    @Prop()
    name: string

    @ApiProperty({ description: '封面', example: '封面1' })
    @Prop()
    // cover: string
    file: string

    // // 关联其他数据
    // // @Prop({ Ref: () => Episode })
    // // @Prop({ type: () => [Episode] })
    // @Prop({ ref: () => Episode })
    // // 参考类型
    // episodes: Ref<Episode>[]
    // // episodes: Episode[] 

    @Prop({
        // ref:'Episode',
        ref:()=>Episode,
        localField:'_id',
        foreignField:'course'
    }
    )
    episodes:Ref<Episode>[]
}

