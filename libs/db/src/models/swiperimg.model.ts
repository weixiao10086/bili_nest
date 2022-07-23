import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, Prop, Ref } from '@typegoose/typegoose'

//为数据添加创建时间和更新时间  
@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})
export class Swiper {
    @ApiProperty({ description: '标题', example: '标题1' })
    @Prop()
    title: string

    @ApiProperty({ description: '轮播图', example: '图片1' })
    @Prop()
    file: string

}
