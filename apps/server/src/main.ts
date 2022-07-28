import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('vue+nest前端页面API')
    .setDescription('前端界面API')
    .setVersion('1.0')
    //swagger启用token的功能(右上角)
    .addBearerAuth()
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);

  app.enableCors();
  await app.listen(3001);
  console.log('http://localhost:3001/api-docs');

}
bootstrap();
