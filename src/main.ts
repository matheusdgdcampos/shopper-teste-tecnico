import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './config/environment-validation';
import { json, urlencoded } from 'express';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));

        return new BadRequestException({
          error_code: 'INVALID_DATA',
          error_description: result,
        });
      },
    }),
  );
  const configService = app.get(ConfigService<EnvironmentVariables>);
  const logger = new Logger(bootstrap.name);
  await app.listen(configService.getOrThrow('PORT', { infer: true }), () => {
    logger.log('Server is running!');
  });
}
bootstrap();
