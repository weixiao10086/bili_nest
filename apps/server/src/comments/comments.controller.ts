import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Comment } from "@libs/db/models/comment.model";
import { ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('评论')
export class CommentsController {
    constructor(
        @InjectModel(Comment) private commentModule: ReturnModelType<typeof Comment>
    ) {

    }

    @Get()
    async index(@Query('query') query: string) {
        const params = JSON.parse(query)
        //populate关联查询          (关联查询user)
        // sort                 _id倒叙排
        // limit                    20条
        // （只显示最新的20条
        // return await this.commentModule.find().populate('user').where(params.where).sort('-_id').limit(20)
        return await this.commentModule.find().populate('user').where(params.where).setOptions(params)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))          //有这个才能用token获取用户信息
    async create(@Body() dto, @Req() req) {
        dto.user = req.user._id
        return await this.commentModule.create(dto)

    }

}
