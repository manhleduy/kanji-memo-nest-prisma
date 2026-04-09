import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  
  const app = await NestFactory.create(AppModule);
  //cors
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  });


  //swagger setup
  const config = new DocumentBuilder()
    .setTitle('Kanji Swagger')
    .setDescription('The kanji API description')
    .setVersion('1.0')
    .addTag('kanji')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //port

  //server setup
  
  await app.listen(8080,'0.0.0.0');

  
  console.log(`server is running on port 8080`);

}
bootstrap();
