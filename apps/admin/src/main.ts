import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminModule } from './admin.module';

async function bootstrap() {
  // const app = await NestFactory.create(AdminModule);
  //明确使用底层哪个框架
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);

  //静态文件托管(文件上传用)
  //                  文件夹位置（名字
  app.useStaticAssets('uploads',{
    //前缀
    prefix:'/uploads'
  })


  const options = new DocumentBuilder()
  .setTitle('vue+nest后台管理API')
  .setDescription('后台管理界面API')
  .setVersion('1.0')
  .addTag('')
  .build();
const document = SwaggerModule.createDocument(app, options);

SwaggerModule.setup('api-docs', app, document);

app.enableCors();
  await app.listen(3000);
  console.log('http://localhost:3000/api-docs');
}
bootstrap();
