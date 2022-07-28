import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

//自定义装饰器
export const CurrentUser=createParamDecorator((data,ctx:ExecutionContext)=>{
    const req:Request=ctx.switchToHttp().getRequest()
    return req.user
})