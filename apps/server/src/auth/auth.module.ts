import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport'
import { localStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  //注册这个Module
  imports: [
    PassportModule
  ],
  controllers: [AuthController],
  //注册的策略
  providers:[localStrategy,JwtStrategy]
})
export class AuthModule { }
