import { User } from '@libs/db/models/user.model';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport'
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'
import { CurrentUser } from './currentuser.decorator';


@Controller('auth')
@ApiTags('登录')
export class AuthController {

    constructor(
        private jwtService: JwtService,                     //定义类型（写代码会有提示
        @InjectModel(User) private userModel: ReturnModelType<typeof User>
    ) { }

    @Post('register')
    @ApiOperation({ summary: '注册' })
    async register(@Body() dto: RegisterDto) {
        const { username, password } = dto;
        const user = await this.userModel.create({
            username,
            password
        })
        return user
    }

    //密码登录的包
    // cnpm i @nestjs/passport passport passport-local passport-jwt --save
    //代码提示包
    // cnpm i @types/passport @types/passport-jwt @types/passport-local --save
    @Post('login')
    @ApiOperation({ summary: '登录' })
    //守卫  填写用什么策略加在这个路由上(这里为本地策略local)这个名字时在local.strategy.ts文件中定义的
    @UseGuards(AuthGuard('local'))
    async login(@Body() dto: LoginDto, @Req() req) {
        // req.user为local.strategy.ts文件中经过验证的user
        // return req.user
        return {
            // cnpm i @nestjs/jwt --save        生成token
            token: this.jwtService.sign(String(req.user._id))
        }
    }

    @Get('user')
    @ApiOperation({ summary: '获取个人信息' })
    @UseGuards(AuthGuard('jwt'))
    //swagger文档中可以输入token
    @ApiBearerAuth()
    // async user(@Req() req) {
    //     return req.user
    // }

    //自定义装饰器                  //类型注解（出现代码提示（DocumentType表示mongoose的文档（会提示_id等
    async user(@CurrentUser() user:DocumentType<User>) {
        return user
    }
}
