import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogIniterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: "*"
  })

  await app.listen(8080, () => {
    console.log('Running on 8080')
    
  });

  app.useGlobalInterceptors(new LogIniterceptor)
}
bootstrap();
