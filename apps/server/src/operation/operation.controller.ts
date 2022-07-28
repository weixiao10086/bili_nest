import { Operation } from '@libs/db/models/operation.model.';
import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
// import { OperationModule } from './operation.module';

@Controller('operation')
@ApiTags('收藏')
export class OperationController {
    constructor(
        @InjectModel(Operation) private operationModule: ReturnModelType<typeof Operation>
    ) {

    }

    @Get('status')
    @UseGuards(AuthGuard('jwt'))          //有这个才能用token获取用户信息
    async getStatus(@Query() dto, @Req() req) {
        dto.user = req.user._id
        //countDocuments查数量
        const count = await this.operationModule.countDocuments(dto);
        return {
            status: count > 0
        }
    }

    @Post('toggle')
    @UseGuards(AuthGuard('jwt'))          //有这个才能用token获取用户信息
    async toggle(@Body() dto, @Req() req) {
        dto.user = req.user._id
        // const count = await this.operationModule.countDocuments(dto);
        const ret=await this.getStatus(dto,req.user)
        if(ret.status){
            await this.operationModule.deleteMany(dto)
        }else{
            await this.operationModule.create(dto)
        }
        //再次查询进行返回，保证数据确实改动了
        // return !ret.status
        return await this.getStatus(dto,req.user)
    }


}
