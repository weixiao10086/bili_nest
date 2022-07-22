import { ApiProperty } from "@nestjs/swagger"

export class RegisterDto {
    @ApiProperty({ description: '用户名', example: 'username1' })
    username: string

    @ApiProperty({ description: '密码', example: '123456' })
    password: string
}