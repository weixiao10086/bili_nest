import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getHello(): string {
    return this.adminService.getHello();
  }

  @ApiTags('图片上传')
  //上传图片配置
  @Post('upload')
  //拦截器
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file){
    // return file
    return {
      url:`http://81.68.198.249/${file.filename}`
    }

  }

}
