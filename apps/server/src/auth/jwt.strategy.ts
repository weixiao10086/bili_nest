//密码本地策略  passport包
// cnpm i @nestjs/passport passport passport-local passport-jwt --save
import { Strategy, StrategyOptions,ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@libs/db/models/user.model'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'

    //                                  这里定义的名字('lcoal')用来填写登录路由的策略(不写的默认为local)
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    //这里默认会引入    默认是username和password(如果不是就需要更改)
    constructor(
        @InjectModel(User) private userModel: ReturnModelType<typeof User>
    ) {
        super({
            //取token           (从头部取)
         jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
         //用token还原出数据        （这里写用来加密的字符串
        secretOrKey:'jwtjwtjwtjwt'
        } as StrategyOptions)
    }

    //怎么去验证
    async validate(id) {
        return await this.userModel.findById(id)
    }

}