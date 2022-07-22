//密码本地策略  passport包
// cnpm i @nestjs/passport passport passport-local passport-jwt --save
import { Strategy, IStrategyOptions } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@libs/db/models/user.model'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { BadRequestException } from '@nestjs/common'
import { compareSync } from 'bcryptjs'

    //                                  这里定义的名字('lcoal')用来填写登录路由的策略(不写的默认为local)
export class localStrategy extends PassportStrategy(Strategy,'local') {
    //这里默认会引入    默认是username和password(如果不是就需要更改)
    constructor(
        @InjectModel(User) private userModel: ReturnModelType<typeof User>
    ) {
        super({
            usernameField: 'username',
            passwordField: 'password'
        } as IStrategyOptions)
    }

    //怎么去验证
    async validate(username: string, password: string) {
        //验证逻辑      
        //数据库中寻找用户名
        const user = await this.userModel.findOne({
            username: username
        }).select('+password')
        //这个是查询密码

        // 如果不存在用户名
        if (!user) {
            throw new BadRequestException('用户名不正确')
        }
        //compareSync对比密码的方法（用这个包的方法，因为这个密码不是明文的，是用这个包加密的
        ///           明文的密码，和密文的从数据库查出的散列过的密码    对比
        if (!compareSync(password, user.password)) {
            // 不正确时
            throw new BadRequestException('密码不正确')
        }
        return user
    }

}