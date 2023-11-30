import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Date', 'Content-Type', 'Origin', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });
  app.use(helmet());
  app.use(helmet.xssFilter());
  app.setGlobalPrefix(process.env.API_VERSION);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  createSwagger(app);
  await app.listen(3000);
}

function createSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bank webservice')
    .setDescription('Webservice for a bank')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
}
bootstrap();
