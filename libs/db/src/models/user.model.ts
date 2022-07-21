import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, Prop } from '@typegoose/typegoose'

//为数据添加创建时间和更新时间  
@modelOptions({
    schemaOptions:{
        timestamps: true,
    }
})
export class User{
    @ApiProperty({description:'用户名',example:'user1'})
    @Prop()
    username: string

    @ApiProperty({description:'密码',example:'password'})
    @Prop()
    password: string
    
}