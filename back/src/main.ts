import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  app.useGlobalPipes(new ValidationPipe());
  
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:5173'
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    credentials: true
  })

  await app.listen(port);
}
bootstrap();
