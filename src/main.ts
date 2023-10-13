import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useWebSocketAdapter(new IoAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('chat api')
    .setDescription('The chat API description')
    .setVersion('0.0.1')
    .addTag('chat')
    .build();

  const documnet = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documnet);

  await app.listen(3000);
}
bootstrap();
